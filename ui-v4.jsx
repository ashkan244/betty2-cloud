// ui-v4.jsx — English Unlocked · the VIDEO-FIRST visual layer.
//
// The whole composition is built around the host's recorded footage (see
// slot.jsx). Captions, brand, phase rail, pass state and countdown were all
// re-placed for this — nothing is a box bolted onto the old faceless layout.
//
// TWO LAYOUTS, ONE EPISODE (see VIDEO-LAYOUT-PLAN.md)
//   K "Keynote"       16:9 panel top-centre, caption centred below.
//                     Used where the HOST is talking: Grounding / Map /
//                     Listening / Anchor. Shoot 16:9 — no crop.
//   S "Studio Split"  full-height video column left, big LEFT-ALIGNED caption
//                     right. Used where the LEARNER reads and repeats:
//                     Articulation / Rhythm.
//
// The switch is a 0.8s morph: the panel grows into the column while the two
// text layouts crossfade. It doubles as the pacing beat of a 6-minute video.
//
// Per-episode override (optional, in data-epNN.jsx):
//   window.EPISODE.layout = "K" | "S" | "hybrid"   (default "hybrid")
//   window.EPISODE.camera = [{start, end}, …]      time ranges you are on camera
//
// Globals used: Sprite, useTime, useTimeline, Easing, clamp (animations.jsx),
// SLOT_GEO, slotMix, CamSlot (slot.jsx), window.EPISODE (data-epNN.jsx).

const V4_DISPLAY = "'Newsreader', Georgia, serif";
const V4_UI      = "'Hanken Grotesk', system-ui, sans-serif";
const V4_MONO    = "'JetBrains Mono', ui-monospace, monospace";

const V4_GOLD   = "#e9c46a";
const V4_GOLD_D = "rgba(233,196,106,0.9)";
const V4_WHITE  = "#f4f1ea";
const V4_FUT    = "rgba(244,241,234,0.26)";
const V4_SLATE  = "#8fa3b0";
const V4_SLATE_F= "rgba(143,163,176,0.30)";
const V4_EASE   = "cubic-bezier(0.22, 1, 0.36, 1)";

const V4_MORPH = 0.8;            // seconds of the K <-> S morph
const V4_SPLIT_PHASES = [4, 5];  // Articulation + Rhythm read better split

// ── shared helpers ───────────────────────────────────────────────────────────
function v4ActiveLine(time) {
  const lines = window.EPISODE.lines;
  let cur = lines[0];
  for (let i = 0; i < lines.length; i++) if (time >= lines[i].start) cur = lines[i];
  return cur;
}

function v4ContentOpacity(time) {
  const ep = window.EPISODE;
  if (ep.contentStart == null) return 1;
  const inA  = clamp((time - (ep.contentStart - 0.7)) / 0.7, 0, 1);
  const outA = clamp((time - ep.contentEnd) / 0.6, 0, 1);
  return inA * (1 - outA);
}

// Build the layout timeline ONCE: a list of {start, key} segments derived from
// the phase of each line. Cached on window so every frame is a cheap lookup.
function v4Segments() {
  if (window.__V4_SEGS) return window.__V4_SEGS;
  const ep = window.EPISODE;
  const mode = ep.layout || "hybrid";
  const keyFor = (line) => {
    if (mode === "K" || mode === "S") return mode;
    return V4_SPLIT_PHASES.indexOf(line.phase) >= 0 ? "S" : "K";
  };
  const segs = [];
  ep.lines.forEach((l) => {
    const k = keyFor(l);
    if (!segs.length || segs[segs.length - 1].key !== k) segs.push({ start: l.start, key: k });
  });
  if (!segs.length) segs.push({ start: 0, key: "K" });
  segs[0].start = 0;
  window.__V4_SEGS = segs;
  return segs;
}

// current layout + morph progress at a given time
function v4LayoutAt(time) {
  const segs = v4Segments();
  let i = 0;
  for (let j = 0; j < segs.length; j++) if (time >= segs[j].start) i = j;
  const to = segs[i].key;
  const from = i > 0 ? segs[i - 1].key : to;
  const p = i > 0 ? clamp((time - segs[i].start) / V4_MORPH, 0, 1) : 1;
  return { from, to, p: Easing.easeInOutCubic ? Easing.easeInOutCubic(p) : p, raw: p };
}

// is the host meant to be on camera right now?
function v4Live(time) {
  const cam = window.EPISODE.camera;
  if (!cam || !cam.length) return true;
  for (let i = 0; i < cam.length; i++) if (time >= cam[i].start && time <= cam[i].end) return true;
  return false;
}

// caption size that keeps a line inside its band without reflowing forever
function v4CapSize(text, base, min) {
  const n = (text || "").length;
  if (n <= 30) return base;
  const s = Math.round(base * 30 / n * 1.22);
  return Math.max(min, Math.min(base, s));
}

// ── glyphs ───────────────────────────────────────────────────────────────────
function V4Mic({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={V4_GOLD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="2" width="6" height="11" rx="3" /><path d="M5 10a7 7 0 0 0 14 0" />
      <line x1="12" y1="17" x2="12" y2="21" /><line x1="8" y1="21" x2="16" y2="21" />
    </svg>
  );
}
function V4Ear({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={V4_GOLD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8.5a6 6 0 0 1 12 0c0 2.5-1.5 3.5-2.6 4.6-1 1-1.4 1.7-1.4 2.9a2.5 2.5 0 0 1-5 0" />
      <path d="M9.5 8.5a2.5 2.5 0 0 1 5 0" />
    </svg>
  );
}
function V4Bell({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={V4_GOLD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9a6 6 0 0 1 12 0c0 4.5 1.8 5.6 2.4 6.2A.6.6 0 0 1 20 16.5H4a.6.6 0 0 1-.4-1.3C4.2 14.6 6 13.5 6 9z" />
      <path d="M10 19.5a2.2 2.2 0 0 0 4 0" />
    </svg>
  );
}
function V4BrandMark({ size = 48, glow = false }) {
  const k = size / 48;
  return (
    <div style={{ width: size, height: size, borderRadius: 13 * k, border: `${1.5 * k}px solid ${V4_GOLD}`,
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: glow ? `0 0 ${52 * k}px -${10 * k}px ${V4_GOLD_D}` : "none" }}>
      <div style={{ width: 15 * k, height: 13 * k, borderRadius: `${4 * k}px ${4 * k}px ${2 * k}px ${2 * k}px`,
        border: `${1.5 * k}px solid ${V4_GOLD}`, borderBottom: "none", position: "relative", top: -3 * k }}>
        <div style={{ position: "absolute", left: -6 * k, top: 9 * k, width: 25 * k, height: 16 * k, borderRadius: 3 * k, background: V4_GOLD }} />
      </div>
    </div>
  );
}

// ── background ───────────────────────────────────────────────────────────────
function V4Grain() {
  const time = useTime();
  const tx = (Math.floor(time * 12) % 7) * 11;
  const ty = (Math.floor(time * 12 + 3) % 5) * 13;
  return (
    <div style={{ position: "absolute", inset: -40, pointerEvents: "none", opacity: 0.045, mixBlendMode: "overlay",
      transform: `translate(${tx}px, ${ty}px)`,
      backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
  );
}

function V4Background() {
  const time = useTime();
  const x = 50 + 6 * Math.sin(time * 0.07);
  const y = 40 + 4 * Math.cos(time * 0.05);
  return (
    <div style={{ position: "absolute", inset: 0,
      background: `radial-gradient(120% 90% at ${x}% ${y}%, #1a2730 0%, #121a20 42%, #0a0e12 78%)` }}>
      <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 360px 80px rgba(5,8,11,0.7)" }} />
      <V4Grain />
    </div>
  );
}

// ── karaoke word ─────────────────────────────────────────────────────────────
function V4Word({ w, time, guide, enter }) {
  const past = time >= w.end;
  const current = time >= w.start && time < w.end;
  const restColor = guide ? V4_SLATE : V4_WHITE;
  const futColor = guide ? V4_SLATE_F : V4_FUT;
  const color = current ? V4_GOLD : past ? restColor : futColor;
  const e = enter == null ? 1 : enter;
  return (
    <span style={{ color, marginRight: "0.28em", display: "inline-block",
      opacity: e, transform: `translateY(${(1 - e) * 16}px)`,
      textShadow: current ? "0 0 26px rgba(233,196,106,0.5)" : "none",
      transition: "color 240ms ease, text-shadow 240ms ease" }}>{w.text}</span>
  );
}

// the current line as karaoke words (shared by both layouts)
function V4Karaoke({ line, time }) {
  const since = time - line.start;
  return line.words.map((w, wi) => {
    const e = Easing.easeOutCubic(clamp((since - wi * 0.08) / 0.42, 0, 1));
    return <V4Word key={wi} w={w} time={time} guide={!line.phrase} enter={e} />;
  });
}

// ── pass state (ear / mic) + countdown ring ──────────────────────────────────
function V4PassState({ line, time, align }) {
  const inPause = line.pause > 0 && time > line.end && time < line.pauseEnd;
  const remRaw = inPause ? line.pause - (time - line.end) : 0;
  const isRepeat = line.pauseType === "repeat";
  const isListen = line.pauseType === "listen";
  const show = inPause && (isRepeat || isListen);
  const pProg = inPause ? clamp((time - line.end) / line.pause, 0, 1) : 0;
  const showNow = isRepeat && inPause && remRaw <= 0.75;
  const label = isRepeat ? "Your turn — repeat" : "Just listen";
  const R = 32, C = 2 * Math.PI * R;
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: align === "left" ? "flex-start" : "space-between",
      gap: align === "left" ? 40 : 0, width: "100%", opacity: show ? 1 : 0, transition: "opacity 300ms ease" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: V4_MONO, fontSize: 19,
        letterSpacing: "0.3em", textTransform: "uppercase", color: V4_GOLD_D, whiteSpace: "nowrap" }}>
        {isRepeat ? <V4Mic /> : <V4Ear />}<span>{label}</span>
      </div>
      <div style={{ position: "relative", width: 74, height: 74, opacity: isRepeat ? 1 : 0 }}>
        <svg viewBox="0 0 74 74" style={{ position: "absolute", inset: 0 }}>
          <circle cx="37" cy="37" r={R} fill="none" stroke="rgba(244,241,234,0.14)" strokeWidth="3" />
          <circle cx="37" cy="37" r={R} fill="none" stroke={V4_GOLD} strokeWidth="4" strokeLinecap="round"
            strokeDasharray={C} strokeDashoffset={C * pProg} transform="rotate(-90 37 37)"
            style={{ filter: `drop-shadow(0 0 7px ${V4_GOLD})` }} />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: V4_MONO, fontSize: showNow ? 20 : 26, fontWeight: 500, color: V4_GOLD, fontVariantNumeric: "tabular-nums" }}>
          {showNow ? "now" : String(Math.max(0, Math.ceil(remRaw))).padStart(2, "0")}
        </div>
      </div>
    </div>
  );
}

// ── vocab chip (one calm line under the caption, both layouts) ───────────────
// The card on screen at `time` and how visible it is. Layout K uses `op` to hand
// the footer line over from the phase rail to the card and back.
function v4VocabAt(time) {
  const vocab = window.EPISODE.vocab || [];
  let v = null;
  for (let i = 0; i < vocab.length; i++) if (time >= vocab[i].show && time <= vocab[i].hide) v = vocab[i];
  const op = v ? clamp((time - v.show) / 0.5, 0, 1) * clamp((v.hide - time) / 0.5, 0, 1) : 0;
  return { v, op };
}

function V4VocabChip({ time, align }) {
  const { v, op } = v4VocabAt(time);
  if (!v) return null;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16, opacity: op,
      justifyContent: align === "center" ? "center" : "flex-start" }}>
      <span style={{ width: 2, height: 28, background: "rgba(233,196,106,0.6)" }} />
      <span style={{ fontFamily: V4_UI, fontWeight: 600, fontSize: 29, color: V4_GOLD }}>{v.word}</span>
      <span style={{ fontFamily: V4_UI, fontWeight: 400, fontSize: 27, color: "rgba(244,241,234,0.82)" }}>{v.def}</span>
    </div>
  );
}

// ── phase rail ───────────────────────────────────────────────────────────────
function V4Rail({ curN, size = 18 }) {
  const phases = window.EPISODE.phases;
  return (
    <div style={{ display: "flex", alignItems: "center", fontFamily: V4_UI, fontSize: size, fontWeight: 500 }}>
      {phases.map((p, i) => {
        const active = p.n === curN, done = p.n < curN;
        return (
          <React.Fragment key={p.key}>
            <div style={{ display: "flex", alignItems: "center", gap: 11, whiteSpace: "nowrap",
              opacity: active ? 1 : done ? 0.5 : 0.3, transition: "opacity 400ms ease" }}>
              <span style={{ width: active ? 13 : 9, height: active ? 13 : 9, borderRadius: 9,
                background: active || done ? V4_GOLD : "transparent",
                border: active || done ? "none" : "1.5px solid rgba(244,241,234,0.5)",
                boxShadow: active ? `0 0 14px ${V4_GOLD}` : "none", transition: "all 400ms ease" }} />
              <span style={{ color: active ? V4_WHITE : "rgba(244,241,234,0.8)", fontWeight: active ? 600 : 500 }}>{p.label}</span>
            </div>
            {i < phases.length - 1 && <span style={{ width: 34, height: 1, background: "rgba(244,241,234,0.16)", margin: "0 17px" }} />}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ── header lockup (shared) ───────────────────────────────────────────────────
function V4Header({ left, right, top }) {
  const ep = window.EPISODE;
  const epNum = ep.epNumber != null ? String(ep.epNumber).padStart(2, "0") : "";
  return (
    <div style={{ position: "absolute", left, right, top, display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <V4BrandMark size={42} />
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.05 }}>
          <span style={{ fontFamily: V4_UI, fontSize: 25, fontWeight: 700, letterSpacing: "0.02em", color: V4_WHITE }}>English</span>
          <span style={{ fontFamily: V4_UI, fontSize: 25, fontWeight: 700, letterSpacing: "0.17em", color: V4_GOLD }}>UNLOCKED</span>
        </div>
      </div>
      <div style={{ textAlign: "right" }}>
        {epNum && <div style={{ fontFamily: V4_MONO, fontSize: 17, letterSpacing: "0.24em", color: "rgba(143,163,176,0.85)", textTransform: "uppercase" }}>{`Episode ${epNum}`}</div>}
        {ep.title && <div style={{ fontFamily: V4_DISPLAY, fontStyle: "italic", fontSize: 27, color: "rgba(244,241,234,0.9)", marginTop: 8 }}>{ep.title}</div>}
      </div>
    </div>
  );
}

// ── LAYOUT K — keynote panel, caption centred below ──────────────────────────
function V4ChromeK({ line, time, opacity }) {
  if (opacity <= 0.001) return null;
  const G = SLOT_GEO.K;
  const size = v4CapSize(line.text, line.phrase ? 68 : 52, 38);
  return (
    <div style={{ position: "absolute", inset: 0, opacity, pointerEvents: "none" }}>
      <V4Header left={84} right={84} top={62} />
      <div style={{ position: "absolute", left: G.x, width: G.w, top: G.y + G.h + 58 }}>
        <V4PassState line={line} time={time} align="between" />
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, top: 828, padding: "0 300px", textAlign: "center",
        fontFamily: V4_DISPLAY, fontStyle: line.phrase ? "italic" : "normal", fontWeight: line.phrase ? 500 : 400,
        fontSize: size, lineHeight: 1.24, textWrap: "balance" }}>
        <V4Karaoke line={line} time={time} />
      </div>
      {/* the footer line is shared: a vocab card takes it over from the phase
          rail while it is up (they used to sit on top of each other here) */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 46, display: "flex", justifyContent: "center",
        opacity: 1 - v4VocabAt(time).op }}>
        <V4Rail curN={line.phase} />
      </div>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 40, height: 36, display: "flex",
        alignItems: "center", justifyContent: "center" }}>
        <V4VocabChip time={time} align="center" />
      </div>
    </div>
  );
}

// ── LAYOUT S — full-height video column left, editorial column right ─────────
function V4ChromeS({ line, time, opacity }) {
  if (opacity <= 0.001) return null;
  const G = SLOT_GEO.S;
  const size = v4CapSize(line.text, line.phrase ? 82 : 58, 42);
  return (
    <div style={{ position: "absolute", inset: 0, opacity, pointerEvents: "none" }}>
      {/* hairline where the column meets the content */}
      <div style={{ position: "absolute", left: G.w, top: 0, bottom: 0, width: 1,
        background: "linear-gradient(to bottom, transparent, rgba(233,196,106,0.45) 22%, rgba(233,196,106,0.45) 78%, transparent)" }} />
      <div style={{ position: "absolute", left: G.w, top: 0, right: 0, bottom: 0, padding: "78px 96px 0 104px",
        display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <V4BrandMark size={42} />
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.05 }}>
              <span style={{ fontFamily: V4_UI, fontSize: 25, fontWeight: 700, color: V4_WHITE }}>English</span>
              <span style={{ fontFamily: V4_UI, fontSize: 25, fontWeight: 700, letterSpacing: "0.17em", color: V4_GOLD }}>UNLOCKED</span>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: V4_MONO, fontSize: 17, letterSpacing: "0.24em", color: "rgba(143,163,176,0.85)", textTransform: "uppercase" }}>
              {window.EPISODE.epNumber != null ? `Episode ${String(window.EPISODE.epNumber).padStart(2, "0")}` : ""}
            </div>
            <div style={{ fontFamily: V4_DISPLAY, fontStyle: "italic", fontSize: 27, color: "rgba(244,241,234,0.9)", marginTop: 8 }}>
              {window.EPISODE.title || ""}
            </div>
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 36, paddingBottom: 40 }}>
          <V4PassState line={line} time={time} align="left" />
          <div style={{ fontFamily: V4_DISPLAY, fontStyle: line.phrase ? "italic" : "normal", fontWeight: line.phrase ? 500 : 400,
            fontSize: size, lineHeight: 1.26, maxWidth: 880, textWrap: "balance" }}>
            <V4Karaoke line={line} time={time} />
          </div>
          <V4VocabChip time={time} align="left" />
        </div>

        <div style={{ paddingBottom: 70, display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontFamily: V4_MONO, fontSize: 17, letterSpacing: "0.26em", color: "rgba(143,163,176,0.8)", textTransform: "uppercase" }}>
            {`Phase ${line.phase} of ${window.EPISODE.phases.length}`}
          </div>
          <V4Rail curN={line.phase} />
        </div>
      </div>
    </div>
  );
}

// ── main stage: the slot morphs, the two chromes crossfade ──────────────────
function V4Main() {
  const time = useTime();
  const op = v4ContentOpacity(time);
  if (op <= 0.001) return null;
  const line = v4ActiveLine(time);
  const L = v4LayoutAt(time);
  const rect = slotMix(L.from, L.to, L.p);
  const kOp = (L.from === "K" ? 1 - L.p : 0) + (L.to === "K" ? L.p : 0);
  const sOp = (L.from === "S" ? 1 - L.p : 0) + (L.to === "S" ? L.p : 0);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: op }}>
      {!(window.dirOn && dirOn()) && (
        <CamSlot rect={rect} name={L.p < 0.5 ? L.from : L.to} time={time} live={v4Live(time)}
          objectPosition={rect.shape === "column" ? "50% 22%" : "50% 26%"} />
      )}
      <V4ChromeK line={line} time={time} opacity={kOp} />
      <V4ChromeS line={line} time={time} opacity={sOp} />
    </div>
  );
}

// ── phrase list, staggered in (used by the cold open and the recap) ──────────
function V4PhraseList({ phrases, localTime, lead, step, size }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, width: 900, margin: "0 auto" }}>
      {phrases.map((p, i) => {
        const e = Easing.easeOutCubic(clamp((localTime - lead - i * step) / 0.5, 0, 1));
        return (
          <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 18, opacity: e,
            transform: `translateY(${(1 - e) * 14}px)` }}>
            <span style={{ fontFamily: V4_MONO, fontSize: size * 0.52, color: V4_GOLD_D, fontVariantNumeric: "tabular-nums" }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span style={{ fontFamily: V4_DISPLAY, fontStyle: "italic", fontWeight: 500, fontSize: size,
              color: "rgba(244,241,234,0.95)", lineHeight: 1.3 }}>{p}</span>
          </div>
        );
      })}
    </div>
  );
}

// ── COLD OPEN — the promise, on camera, in the first seconds ─────────────────
// Before this existed the video opened with 4.6s of logo and did not reach a
// single target phrase until ~1:28. Now the viewer sees the host and reads
// exactly what they are about to be able to say, immediately.
function V4Hook() {
  const ep = window.EPISODE;
  if (!ep.hook) return null;
  const G = SLOT_GEO.K;
  return (
    <Sprite start={ep.hook.start} end={ep.hook.end}>
      {({ localTime, duration }) => {
        const inE = Easing.easeOutCubic(clamp(localTime / 0.6, 0, 1));
        const outStart = duration - 0.7;
        const outP = localTime > outStart ? clamp((localTime - outStart) / 0.7, 0, 1) : 0;
        const op = inE * (1 - outP);
        const n = ep.hook.phrases.length;
        const step = n > 0 ? Math.max(0.34, (duration - 3.1) / n) : 0.5;
        return (
          <div style={{ position: "absolute", inset: 0, opacity: op, pointerEvents: "none" }}>
            {!(window.dirOn && dirOn()) && <CamSlot rect={{ ...G, y: 74, h: 470 }} name="HOOK" time={window.EPISODE.hook.start + localTime} />}
            <div style={{ position: "absolute", left: 0, right: 0, top: 590, textAlign: "center",
              opacity: window.dirOn && dirOn() ? clamp((localTime - 1.9) / 0.5, 0, 1) : 1 }}>
              <div style={{ fontFamily: V4_MONO, fontSize: 19, letterSpacing: "0.32em", textTransform: "uppercase", color: V4_GOLD_D }}>
                By the end of this video
              </div>
            </div>
            {/* director: while the host fills the frame, the promise sits as a lower third */}
            {window.dirOn && dirOn() && ep.hook.text && (
              <div style={{ position: "absolute", left: 120, right: 120, bottom: 120, textAlign: "center",
                opacity: clamp((localTime - 0.25) / 0.4, 0, 1) * clamp((1.75 - localTime) / 0.35, 0, 1),
                fontFamily: V4_DISPLAY, fontStyle: "italic", fontWeight: 500, fontSize: 64, lineHeight: 1.2,
                color: V4_WHITE, textShadow: "0 4px 30px rgba(0,0,0,0.9)" }}>
                {ep.hook.text}
              </div>
            )}
            <div style={{ position: "absolute", left: 0, right: 0, top: 648 }}>
              <V4PhraseList phrases={ep.hook.phrases} localTime={localTime} lead={window.dirOn && dirOn() ? 2.3 : 0.9}
                step={window.dirOn && dirOn() ? Math.max(0.3, step - 0.28) : step} size={34} />
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

// ── RECAP — the payoff card: everything you practised, at once ───────────────
function V4Recap() {
  const ep = window.EPISODE;
  if (!ep.recap) return null;
  return (
    <Sprite start={ep.recap.start} end={ep.recap.end}>
      {({ localTime, duration }) => {
        const inE = Easing.easeOutCubic(clamp(localTime / 0.7, 0, 1));
        const outStart = duration - 0.7;
        const outP = localTime > outStart ? clamp((localTime - outStart) / 0.7, 0, 1) : 0;
        const op = inE * (1 - outP);
        const n = ep.recap.phrases.length;
        const step = n > 0 ? Math.max(0.28, (duration - 2.6) / n) : 0.4;
        return (
          <div style={{ position: "absolute", inset: 0, opacity: op, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
            <div style={{ fontFamily: V4_MONO, fontSize: 20, letterSpacing: "0.34em", textTransform: "uppercase",
              color: V4_GOLD_D, marginBottom: 14 }}>You can now say</div>
            <div style={{ width: 120, height: 1, background: "rgba(233,196,106,0.45)", margin: "26px 0 44px" }} />
            <V4PhraseList phrases={ep.recap.phrases} localTime={localTime} lead={0.5} step={step} size={44} />
          </div>
        );
      }}
    </Sprite>
  );
}

// ── intro / outro cards ──────────────────────────────────────────────────────
function V4Intro() {
  const ep = window.EPISODE;
  if (!ep.intro) return null;
  const epNum = ep.epNumber != null ? String(ep.epNumber).padStart(2, "0") : "";
  return (
    <Sprite start={ep.intro.start} end={ep.intro.end}>
      {({ localTime, duration }) => {
        const inE = Easing.easeOutCubic(clamp(localTime / 1.0, 0, 1));
        const outStart = duration - 0.9;
        const outP = localTime > outStart ? clamp((localTime - outStart) / 0.9, 0, 1) : 0;
        const op = inE * (1 - outP);
        const rise = (1 - inE) * 18 - outP * 12;
        return (
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", opacity: op, transform: `translateY(${rise}px)`, pointerEvents: "none" }}>
            <div style={{ marginBottom: 36 }}><V4BrandMark size={88} glow /></div>
            <div style={{ display: "flex", gap: 18, alignItems: "baseline" }}>
              <span style={{ fontFamily: V4_UI, fontSize: 66, fontWeight: 700, color: V4_WHITE }}>English</span>
              <span style={{ fontFamily: V4_UI, fontSize: 66, fontWeight: 700, letterSpacing: "0.16em", color: V4_GOLD }}>UNLOCKED</span>
            </div>
            <div style={{ width: 120, height: 1, background: "rgba(233,196,106,0.5)", margin: "40px 0 32px" }} />
            {epNum && <div style={{ fontFamily: V4_MONO, fontSize: 22, letterSpacing: "0.34em", color: V4_SLATE, textTransform: "uppercase" }}>{`Episode ${epNum}`}</div>}
            {ep.title && <div style={{ fontFamily: V4_DISPLAY, fontStyle: "italic", fontWeight: 500, fontSize: 60, color: "rgba(244,241,234,0.95)", marginTop: 18, textAlign: "center" }}>{ep.title}</div>}
          </div>
        );
      }}
    </Sprite>
  );
}

function V4Outro() {
  const ep = window.EPISODE;
  if (!ep.outro) return null;
  const next = window.euNextEpisode && ep.epNumber != null ? window.euNextEpisode(ep.epNumber) : null;
  return (
    <Sprite start={ep.outro.start} end={ep.outro.end}>
      {({ localTime, duration }) => {
        const inE = Easing.easeOutCubic(clamp(localTime / 1.2, 0, 1));
        const outStart = duration - 0.7;
        const outP = localTime > outStart ? clamp((localTime - outStart) / 0.7, 0, 1) : 0;
        const op = inE * (1 - outP);
        return (
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: window.dirOn && dirOn() ? "flex-end" : "center",
            paddingBottom: window.dirOn && dirOn() ? 96 : 0, opacity: op, pointerEvents: "none" }}>
            <div style={{ fontFamily: V4_DISPLAY, fontStyle: "italic", fontWeight: 500, fontSize: 62, color: V4_WHITE, textAlign: "center", lineHeight: 1.32 }}>
              Take a breath.<br />You did well today.
            </div>
            <div style={{ width: 110, height: 1, background: "rgba(233,196,106,0.45)", margin: "46px 0 36px" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <V4Bell size={28} />
              <span style={{ fontFamily: V4_UI, fontSize: 30, fontWeight: 500, color: "rgba(244,241,234,0.9)" }}>Subscribe to keep your English unlocked.</span>
            </div>
            {/* a reason to start the next session (RETENTION-PLAN §3.3); from series.js */}
            {next && (
              <div style={{ marginTop: 54, textAlign: "center", opacity: clamp((localTime - 0.6) / 0.8, 0, 1) }}>
                <div style={{ fontFamily: V4_MONO, fontSize: 18, letterSpacing: "0.3em", textTransform: "uppercase", color: V4_GOLD_D }}>
                  {`Next · Episode ${String(next.n).padStart(2, "0")}`}
                </div>
                <div style={{ fontFamily: V4_DISPLAY, fontStyle: "italic", fontWeight: 500, fontSize: 46, color: V4_GOLD, marginTop: 12 }}>
                  {next.title}
                </div>
              </div>
            )}
          </div>
        );
      }}
    </Sprite>
  );
}

function V4Progress() {
  const time = useTime();
  const { duration } = useTimeline();
  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 5, background: "rgba(244,241,234,0.09)", zIndex: 90 }}>
      <div style={{ height: "100%", width: `${clamp(time / duration, 0, 1) * 100}%`, background: V4_GOLD, boxShadow: `0 0 14px ${V4_GOLD}` }} />
    </div>
  );
}

// fx-v4.jsx motion layer: ON by default since 2026-10-12; ?fx=0 (or EPISODE.fx = false) turns it off
const V4_FX_ON = new URLSearchParams(location.search).get("fx") !== "0";

function EpisodeV4() {
  const fx = V4_FX_ON && window.EPISODE.fx !== false && window.V4FXFront;
  return (
    <React.Fragment>
      <V4Background />
      {fx && <V4FXBack />}
      {window.dirOn && dirOn() && <DirectorCam />}
      <V4Main />
      {fx && <V4FXFront />}
      <V4Hook />
      <V4Intro />
      <V4Recap />
      <V4Outro />
      <V4Progress />
    </React.Fragment>
  );
}

Object.assign(window, { EpisodeV4 });
