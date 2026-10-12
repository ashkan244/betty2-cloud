// director.jsx — English Unlocked · the CAMERA DIRECTOR (video-first episodes).
//
// Before this, the host's footage lived in fixed slots that were filled in
// afterwards (compose.mjs). A fixed overlay cannot grow, shrink or move, so the
// camera could never follow the story of the episode. The director owns ONE
// continuous camera layer for the whole video and decides, moment by moment,
// how big it is and where it sits:
//
//   hook       FULL frame — the host says the promise face to face — then
//              shrinks into the hook panel while the five phrases arrive
//   stinger    leaves the frame (brand card)
//   content    the K panel / S column of ui-v4 (same geometry, so every caption
//              still fits), plus PUNCH-INS: narration lines in K alternate
//              between a wide and a tight framing — the "digital two-camera"
//              cut editors use to make one locked-off take feel edited
//   recap      a small picture-in-picture: the text is the hero, the host stays
//   outro      FULL frame again, goodbye on camera, text in the lower band
//
// The footage is rendered INTO the frame (render.mjs CAM=<clip>), not laid over
// it later, which is what makes the moves possible. render.mjs waits for every
// video seek to land before capturing, so each frame shows the exact clip frame.
//
// On by default; ?dir=0 or window.EPISODE.director = false gives the fixed v4 slots back.
// Face position inside the footage: window.EPISODE.face = "50% 26%" or ?face=50,26.

const DIR_FULL = { x: 0, y: 0, w: 1920, h: 1080, r: 0, shape: "rect" };
const DIR_HOOK = { x: 440, y: 74, w: 1040, h: 470, r: 20, shape: "rect" };
const DIR_PIP  = { x: 1528, y: 800, w: 320, h: 180, r: 16, shape: "rect" };
const DIR_MOVE = 0.75;     // seconds for a size/position change
const DIR_PUNCH = 1.13;    // tight framing on alternate narration lines

function dirOn() {
  if (window.__DIR_ON != null) return window.__DIR_ON;
  // ON by default since 2026-10-12; ?dir=0 (or EPISODE.director = false) restores the fixed v4 slots
  const q = new URLSearchParams(location.search).get("dir");
  return (window.__DIR_ON = q !== "0" && !(window.EPISODE && window.EPISODE.director === false));
}

function dirFace() {
  const q = new URLSearchParams(location.search).get("face");
  if (q) { const p = q.split(",").map(Number); return `${p[0] || 50}% ${p[1] || 26}%`; }
  return (window.EPISODE && window.EPISODE.face) || "50% 26%";
}

function dirLerpRect(A, B, p) {
  if (p <= 0) return A;
  if (p >= 1) return B;
  const L = (a, b) => a + (b - a) * p;
  return { x: L(A.x, B.x), y: L(A.y, B.y), w: L(A.w, B.w), h: L(A.h, B.h), r: L(A.r || 0, B.r || 0), shape: "rect" };
}

const dirEase = (p) => (Easing.easeInOutCubic ? Easing.easeInOutCubic(clamp(p, 0, 1)) : clamp(p, 0, 1));

// a calm "away" pose: the panel, a little smaller, invisible
function dirAway(R) {
  const s = 0.9;
  return { x: R.x + (R.w * (1 - s)) / 2, y: R.y + (R.h * (1 - s)) / 2, w: R.w * s, h: R.h * s, r: R.r, shape: "rect" };
}

// The shot at time t: { rect, zoom, op, full } — pure function of time.
function dirShot(t) {
  const E = window.EPISODE;
  const K = SLOT_GEO.K;
  const hook = E.hook, intro = E.intro, recap = E.recap, outro = E.outro;

  // ── cold open ──
  if (hook && t < hook.end) {
    const toPanel = dirEase((t - (hook.start + 1.7)) / DIR_MOVE);
    const leave = clamp((t - (hook.end - 0.7)) / 0.7, 0, 1);
    return { rect: dirLerpRect(DIR_FULL, DIR_HOOK, toPanel), zoom: 1, op: 1 - leave, full: 1 - toPanel };
  }
  // ── brand stinger: no camera ──
  if (intro && t < intro.end - 0.05) return { rect: dirAway(K), zoom: 1, op: 0, full: 0 };

  // ── outro: full frame, goodbye on camera ──
  if (outro && t >= outro.start) {
    const p = dirEase((t - outro.start) / DIR_MOVE);
    const from = recap ? DIR_PIP : K;
    return { rect: dirLerpRect(from, DIR_FULL, p), zoom: 1, op: 1, full: p };
  }
  // ── recap: picture-in-picture ──
  if (recap && t >= recap.start) {
    const p = dirEase((t - recap.start) / DIR_MOVE);
    return { rect: dirLerpRect(K, DIR_PIP, p), zoom: 1, op: 1, full: 0 };
  }
  // after the content ends but before the recap (the short tail): stay in K
  // ── content: the v4 K / S geometry, with punch-ins ──
  const L = v4LayoutAt(t);
  const rect = slotMix(L.from, L.to, L.p);
  const line = v4ActiveLine(t);
  const inK = L.to === "K" && L.raw >= 1;
  // narration lines alternate wide / tight; target phrases stay wide so the
  // learner sees the whole mouth and face while hearing the phrase
  const zoom = inK && line && !line.phrase && line.index % 2 === 1 ? DIR_PUNCH : 1;
  const op = E.contentStart != null && t < E.contentStart ? v4ContentOpacity(t) : 1;
  return { rect: { ...rect, shape: "rect" }, zoom, op, full: 0 };
}

// The one camera layer. Mounted for the whole episode, so the <video> element
// (and its decode state) is never recreated between sections.
function DirectorCam() {
  const time = useTime();
  const o = slotOptions();
  const shot = dirShot(time);
  const R = shot.rect;
  const live = v4Live(time);
  const showCam = !!o.cam && live;
  const pos = dirFace();
  const radius = R.r || 0;
  const edge = 1 - shot.full;                 // frame chrome fades away as the camera fills the screen
  return (
    <div style={{ position: "absolute", left: R.x, top: R.y, width: R.w, height: R.h, opacity: shot.op,
      borderRadius: radius, pointerEvents: "none",
      boxShadow: `0 60px 120px -40px rgba(0,0,0,${0.95 * edge}), 0 0 0 1px rgba(233,196,106,${0.42 * edge}), 0 0 90px -30px rgba(233,196,106,${0.28 * edge})` }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: radius, overflow: "hidden",
        background: "linear-gradient(160deg, #141d24 0%, #0d1319 60%, #0a0e12 100%)" }}>
        <div style={{ position: "absolute", inset: 0, transform: `scale(${shot.zoom})`, transformOrigin: pos }}>
          {showCam
            ? <SlotFootage src={o.cam} isVideo={o.isVideo} time={time} camStart={o.camStart} objectPosition={pos} />
            : <SlotIdleOrb w={R.w} h={R.h} time={time} />}
        </div>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(70% 55% at 48% 34%, rgba(233,196,106,0.13), transparent 70%)", mixBlendMode: "soft-light" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(85% 72% at 50% 45%, transparent 54%, rgba(6,8,11,0.55) 100%)" }} />
        {/* full frame: a floor for the words laid over the footage */}
        {shot.full > 0.01 && (
          <div style={{ position: "absolute", inset: 0, opacity: shot.full,
            background: "linear-gradient(to top, rgba(6,9,13,0.92) 0%, rgba(6,9,13,0.55) 34%, transparent 62%), linear-gradient(to bottom, rgba(6,9,13,0.6), transparent 22%)" }} />
        )}
        {/* the S column keeps its fade into the text side */}
        {R.x === 0 && R.w < 1000 && (
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(10,14,18,0.34) 0%, transparent 22%, transparent 70%, rgba(10,14,18,0.94) 100%)" }} />
        )}
      </div>
    </div>
  );
}

Object.assign(window, { DirectorCam, dirOn, dirShot, DIR_FULL, DIR_PIP });
