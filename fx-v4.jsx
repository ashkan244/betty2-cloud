// fx-v4.jsx — English Unlocked · motion layer for the video-first episodes.
//
// The v4 layouts are calm but nearly static between captions. This layer adds
// life without breaking the meditative feel or the slot contract (nothing is
// ever drawn INSIDE the camera rect — only around it):
//
//   V4FXBack   floating gold dust behind everything (slow, sparse)
//   V4FXFront  · a voice level meter beside the camera panel, driven by the
//                word timings — moves while the host speaks, still in pauses
//              · a "your turn" ripple: rings expand OUT of the panel's edge
//                during every repeat pause, so the cue is felt, not just read
//              · a soft light sweep across the frame on every phase change
//
// Every value is a pure function of time (no state, no CSS transitions), so the
// frame-by-frame renderer stays exact. Loaded by player.html; switched on with
// ?fx=1 (default off until the finished renders are re-rendered with it).

const FX_GOLD = "233,196,106";

// small deterministic noise: the same i always gives the same number
function fxRand(i, salt) {
  const x = Math.sin(i * 127.1 + (salt || 0) * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

// 0..1 "is someone speaking right now" from the karaoke word windows
function fxSpeech(time) {
  const lines = window.EPISODE.lines;
  for (let i = lines.length - 1; i >= 0; i--) {
    const L = lines[i];
    if (time < L.start) continue;
    if (time > L.end + 0.25) return 0;
    for (let k = 0; k < L.words.length; k++) {
      const w = L.words[k];
      if (time >= w.start - 0.05 && time <= w.end + 0.12) {
        // each word swells and settles — a syllable-ish envelope
        const p = clamp((time - w.start) / Math.max(0.12, w.end - w.start), 0, 1);
        return 0.55 + 0.45 * Math.sin(Math.PI * p);
      }
    }
    return 0.25;
  }
  return 0;
}

// ── background dust ──────────────────────────────────────────────────────────
function V4FXBack() {
  const time = useTime();
  const dots = [];
  for (let i = 0; i < 28; i++) {
    const speed = 6 + fxRand(i, 1) * 10;                     // px per second, upward
    const x = fxRand(i, 2) * 1920 + 40 * Math.sin(time * (0.05 + fxRand(i, 3) * 0.08) + i);
    const y = 1120 - ((fxRand(i, 4) * 1200 + time * speed) % 1200);
    const r = 1.2 + fxRand(i, 5) * 2.6;
    const tw = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(time * (0.6 + fxRand(i, 6)) + i * 2.1));
    dots.push(
      <div key={i} style={{ position: "absolute", left: x, top: y, width: r * 2, height: r * 2, borderRadius: "50%",
        background: `rgba(${FX_GOLD},${0.22 * tw})`, boxShadow: `0 0 ${r * 5}px rgba(${FX_GOLD},${0.18 * tw})` }} />
    );
  }
  return <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>{dots}</div>;
}

// ── voice meter beside the panel ─────────────────────────────────────────────
function V4FXMeter({ rect, time, opacity }) {
  const s = fxSpeech(time);
  const N = 23;
  const below = rect.y + rect.h < 860;          // K: a waveform under the panel; S: a meter right of the column
  const bars = [];
  for (let j = 0; j < N; j++) {
    const centre = 1 - Math.abs(j - (N - 1) / 2) / ((N - 1) / 2);          // taller in the middle
    const wob = 0.35 + 0.65 * Math.abs(Math.sin(time * (7 + fxRand(j, 7) * 9) + j * 1.7));
    const a = 0.08 + s * (0.25 + 0.75 * centre) * wob;
    const len = 4 + a * (below ? 34 : 42);
    bars.push(below
      ? <span key={j} style={{ width: 4, height: len, borderRadius: 2, background: `rgba(${FX_GOLD},${0.35 + 0.6 * a})` }} />
      : <span key={j} style={{ height: 4, width: len, borderRadius: 2, background: `rgba(${FX_GOLD},${0.35 + 0.6 * a})` }} />);
  }
  const box = below
    ? { left: rect.x + rect.w / 2 - 130, top: rect.y + rect.h + 16, width: 260, height: 42, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }
    : { left: rect.x + rect.w + 14, top: rect.y + rect.h / 2 - 150, width: 46, height: 300, flexDirection: "column", alignItems: "flex-start", justifyContent: "space-between" };
  return <div style={{ position: "absolute", display: "flex", opacity, pointerEvents: "none", ...box }}>{bars}</div>;
}

// ── "your turn": rings leave the panel edge during a repeat pause ───────────
function V4FXRipple({ rect, line, time, opacity }) {
  const inPause = line && line.pauseType === "repeat" && time > line.end && time < line.pauseEnd;
  if (!inPause) return null;
  const since = time - line.end;
  const fade = clamp(since / 0.4, 0, 1) * clamp((line.pauseEnd - time) / 0.5, 0, 1);
  const rings = [];
  for (let k = 0; k < 2; k++) {
    const p = ((since + k * 0.8) % 1.6) / 1.6;                 // 0..1, one ring every 0.8s
    const grow = 6 + p * 46;
    const radius = rect.shape === "circle" ? "50%" : (rect.r || 0) + grow;
    rings.push(
      <div key={k} style={{ position: "absolute", left: rect.x - grow, top: rect.y - grow,
        width: rect.w + grow * 2, height: rect.h + grow * 2, borderRadius: radius, boxSizing: "border-box",
        border: `2px solid rgba(${FX_GOLD},${(1 - p) * 0.55 * fade})` }} />
    );
  }
  return <div style={{ position: "absolute", inset: 0, opacity, pointerEvents: "none" }}>{rings}</div>;
}

// ── light sweep on each phase change ────────────────────────────────────────
function v4FXPhaseStarts() {
  if (window.__V4_FX_PH) return window.__V4_FX_PH;
  const out = [];
  let last = null;
  window.EPISODE.lines.forEach((l) => { if (l.phase !== last) { out.push(l.start); last = l.phase; } });
  return (window.__V4_FX_PH = out.slice(1));       // the first phase arrives with the intro, no sweep
}

function V4FXSweep({ time }) {
  const starts = v4FXPhaseStarts();
  let t0 = null;
  for (let i = 0; i < starts.length; i++) if (time >= starts[i] && time < starts[i] + 1.6) t0 = starts[i];
  if (t0 == null) return null;
  const p = Easing.easeInOutCubic ? Easing.easeInOutCubic((time - t0) / 1.6) : (time - t0) / 1.6;
  const x = -40 + p * 140;                          // % across the frame
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", mixBlendMode: "screen",
      background: `linear-gradient(105deg, transparent ${x - 18}%, rgba(${FX_GOLD},0.10) ${x - 4}%, rgba(255,240,210,0.16) ${x}%, rgba(${FX_GOLD},0.10) ${x + 4}%, transparent ${x + 18}%)` }} />
  );
}

function V4FXFront() {
  const time = useTime();
  const op = v4ContentOpacity(time);
  if (op <= 0.001) return null;
  const L = v4LayoutAt(time);
  const rect = slotMix(L.from, L.to, L.p);
  const steady = L.raw >= 1 ? 1 : Math.abs(2 * L.raw - 1);    // dip out through the K <-> S morph
  const line = v4ActiveLine(time);
  return (
    <div style={{ position: "absolute", inset: 0, opacity: op, pointerEvents: "none" }}>
      <V4FXMeter rect={rect} time={time} opacity={0.9 * steady} />
      <V4FXRipple rect={rect} line={line} time={time} opacity={steady} />
      <V4FXSweep time={time} />
    </div>
  );
}

Object.assign(window, { V4FXBack, V4FXFront });
