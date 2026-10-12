// slot.jsx — English Unlocked · the shared CAMERA SLOT system.
//
// Every video-bearing layout reserves ONE rectangle for the host's recorded
// footage. Nothing else is ever drawn inside that rectangle, so the clip can be
// dropped straight on top of the render with no keying and no mask — the frame,
// glow and shadow are painted just OUTSIDE the rect and stay visible.
//
// THE THREE GEOMETRIES (canvas 1920x1080 unless noted)
//   K  "Keynote"      centred 16:9 panel   — shoot 16:9, NO crop needed
//   S  "Studio Split" full-height column   — centre-crop from 16:9, shoot wide
//   N  "Narrator"     circle (Slow Story)  — centre crop, head+shoulders
//   KV "Keynote 9:16" vertical shorts panel (canvas 1080x1920)
//
// MODES
//   idle          no footage yet → the breathing orb sits INSIDE the rect, so a
//                 render without any clip is still a complete-looking frame.
//   cam=<src>     preview/burn-in a still or a video in the slot (?cam=…).
//   slot=guide    framing guide: outline + coordinates + thirds + safe area.
//                 Open this BEFORE recording to see how to sit in frame.
//
// Consumed by ui-v4.jsx (English Unlocked) and story-ui.jsx (Slow Story).

const SLOT_GOLD = "#e9c46a";
const SLOT_WHITE = "#f4f1ea";
const SLOT_MONO = "'JetBrains Mono', ui-monospace, monospace";
const SLOT_GUIDE = "#35e0ff";

const SLOT_GEO = {
  K:  { x: 440, y: 112, w: 1040, h: 585, r: 20,  shape: "rect"   },
  S:  { x: 0,   y: 0,   w: 790,  h: 1080, r: 0,  shape: "column" },
  N:  { x: 92,  y: 656, w: 306,  h: 306, r: 153, shape: "circle" },
  KV: { x: 60,  y: 190, w: 960,  h: 540, r: 20,  shape: "rect"   },
};

function slotLerp(a, b, p) { return a + (b - a) * p; }

// blend two named geometries (used for the K <-> S morph)
function slotMix(fromKey, toKey, p) {
  const A = SLOT_GEO[fromKey], B = SLOT_GEO[toKey];
  if (!A || !B) return A || B;
  if (p <= 0) return A;
  if (p >= 1) return B;
  return {
    x: slotLerp(A.x, B.x, p), y: slotLerp(A.y, B.y, p),
    w: slotLerp(A.w, B.w, p), h: slotLerp(A.h, B.h, p),
    r: slotLerp(A.r, B.r, p),
    shape: p < 0.5 ? A.shape : B.shape,
  };
}

// read ?cam= / ?slot= once
function slotOptions() {
  if (window.__SLOT_OPTS) return window.__SLOT_OPTS;
  const q = new URLSearchParams(location.search);
  const o = {
    cam: q.get("cam") || "",
    guide: (q.get("slot") || "") === "guide",
    bare: (q.get("slot") || "") === "bare",
    camStart: parseFloat(q.get("camstart") || "0") || 0,
  };
  o.isVideo = /\.(mp4|webm|mov|m4v)(\?|$)/i.test(o.cam);
  window.__SLOT_OPTS = o;
  return o;
}

// ── the breathing orb, sized to whatever rect it is given ────────────────────
function SlotIdleOrb({ w, h, time }) {
  const d = Math.min(w, h) * 0.52;
  const breath = 1 + 0.055 * Math.sin(time * (2 * Math.PI / 9));
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: d, height: d, position: "relative", transform: `scale(${breath})` }}>
        <div style={{ position: "absolute", inset: "9%", borderRadius: "50%",
          background: "radial-gradient(circle at 42% 38%, rgba(233,196,106,0.55), rgba(217,148,90,0.18) 55%, transparent 72%)",
          filter: "blur(6px)" }} />
        <div style={{ position: "absolute", inset: "24%", borderRadius: "50%",
          background: "radial-gradient(circle at 45% 40%, rgba(255,236,196,0.85), rgba(233,196,106,0.35) 60%, transparent 75%)",
          filter: "blur(2px)" }} />
      </div>
    </div>
  );
}

// ── footage (still or video), graded into the night palette ──────────────────
function SlotFootage({ src, isVideo, time, camStart, objectPosition }) {
  const ref = React.useRef(null);
  const local = Math.max(0, time - camStart);
  React.useEffect(() => {
    const v = ref.current;
    if (!v || !isVideo) return;
    // drive the clip off the single timeline playhead so it stays deterministic
    const tol = window.__RENDER_MODE || new URLSearchParams(location.search).has("render") ? 0.004 : 0.06;
    if (Math.abs(v.currentTime - local) > tol) { try { v.currentTime = local; } catch (e) {} }
  });
  const style = {
    position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
    objectPosition: objectPosition || "50% 26%",
    filter: "contrast(1.05) saturate(0.86) brightness(0.88)",
  };
  if (isVideo) return <video ref={ref} src={src} muted playsInline data-cam-video="1" style={style} />;
  return <img src={src} draggable={false} style={style} />;
}

// ── the framing guide (only with ?slot=guide) ────────────────────────────────
function SlotGuide({ rect, name, time }) {
  const L = { fontFamily: SLOT_MONO, fontSize: 17, letterSpacing: "0.16em", color: SLOT_GUIDE };
  const t3x = rect.w / 3, t3y = rect.h / 3;
  return (
    <React.Fragment>
      <div style={{ position: "absolute", inset: 0, border: `3px dashed ${SLOT_GUIDE}`, borderRadius: rect.r, pointerEvents: "none" }} />
      {/* rule of thirds */}
      {[t3x, t3x * 2].map((x, i) => <div key={"v" + i} style={{ position: "absolute", left: x, top: 0, bottom: 0, width: 1, background: "rgba(53,224,255,0.35)" }} />)}
      {[t3y, t3y * 2].map((y, i) => <div key={"h" + i} style={{ position: "absolute", top: y, left: 0, right: 0, height: 1, background: "rgba(53,224,255,0.35)" }} />)}
      {/* eye line — sit so your eyes land here */}
      <div style={{ position: "absolute", top: rect.h * 0.35, left: 0, right: 0, height: 2, background: SLOT_GUIDE, opacity: 0.85 }} />
      <div style={{ position: "absolute", top: rect.h * 0.35 + 10, left: 14, ...L }}>EYE LINE</div>
      {/* head safe area */}
      <div style={{ position: "absolute", left: rect.w * 0.22, top: rect.h * 0.08, width: rect.w * 0.56, height: rect.h * 0.72,
        border: `2px solid rgba(53,224,255,0.5)`, borderRadius: 18 }} />
      <div style={{ position: "absolute", left: 14, top: 12, ...L }}>{`SLOT ${name}`}</div>
      <div style={{ position: "absolute", left: 14, bottom: 12, ...L }}>
        {`x${Math.round(rect.x)} y${Math.round(rect.y)} ${Math.round(rect.w)}x${Math.round(rect.h)}`}
      </div>
      <div style={{ position: "absolute", right: 14, bottom: 12, ...L }}>{`t ${time.toFixed(1)}s`}</div>
    </React.Fragment>
  );
}

// ── the slot itself ──────────────────────────────────────────────────────────
// rect      geometry (from SLOT_GEO or slotMix)
// name      label used by the guide
// live      true while the host is meant to be on camera; false → idle orb
// ring      optional { progress 0..1 } countdown drawn AROUND a circle slot
function CamSlot({ rect, name, time, live = true, opacity = 1, objectPosition, zIndex = 20 }) {
  const o = slotOptions();
  const circle = rect.shape === "circle";
  const column = rect.shape === "column";
  const radius = circle ? "50%" : rect.r;
  const showCam = !!o.cam && live;
  // ?slot=bare — no panel, no frame, no idle orb: the reserved area is left
  // completely empty for KEYED cutout footage (solid backdrop keyed out in
  // compose.mjs --key), so the host stands in the composition with no box.
  if (o.bare && !o.guide) return null;

  // the frame chrome lives OUTSIDE the rect so a clip dropped on top never hides it
  const shadow = column
    ? "none"
    : `0 60px 120px -40px rgba(0,0,0,0.95), 0 0 0 1px rgba(233,196,106,${circle ? 0.62 : 0.42}), 0 0 90px -30px rgba(233,196,106,0.28)`;

  return (
    <div style={{ position: "absolute", left: rect.x, top: rect.y, width: rect.w, height: rect.h, opacity,
      borderRadius: radius, boxShadow: shadow, zIndex }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: radius, overflow: "hidden",
        background: "linear-gradient(160deg, #141d24 0%, #0d1319 60%, #0a0e12 100%)" }}>
        {showCam
          ? <SlotFootage src={o.cam} isVideo={o.isVideo} time={time} camStart={o.camStart} objectPosition={objectPosition} />
          : <SlotIdleOrb w={rect.w} h={rect.h} time={time} />}
        {/* grade + vignette so any footage settles into the night palette */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(70% 55% at 48% 34%, rgba(233,196,106,0.13), transparent 70%)", mixBlendMode: "soft-light" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(85% 72% at 50% 45%, transparent 54%, rgba(6,8,11,0.55) 100%)" }} />
        {column && (
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(10,14,18,0.34) 0%, transparent 22%, transparent 70%, rgba(10,14,18,0.94) 100%)" }} />
        )}
        {o.guide && <SlotGuide rect={rect} name={name} time={time} />}
      </div>
    </div>
  );
}

Object.assign(window, { SLOT_GEO, slotMix, slotOptions, CamSlot, SlotIdleOrb, SlotFootage });
