// story-fx.jsx — Slow Story · motion layer for the narrator layout (story-ui-v2).
//
// The narrator layout was a slideshow: one caption block per ~18s beat, one
// slow Ken Burns move, a static circle. This layer keeps the calm but gives
// every second something alive:
//
//   s2Move            six camera moves in rotation (push, pull, pans, tilt)
//   S2FXParticles     a per-story atmosphere: lighthouse beam, dream stars,
//                     coffee steam, summer pollen, market dust, rain
//   S2FXLeak          a warm light leak that washes across each image change
//   S2KineticCap      the caption arrives word by word (rise + un-blur), the
//                     word being read in gold — reading follows the voice
//   S2FXRing          a soft ring around the narrator circle that pulses with
//                     the words (outside the circle: the slot stays clean)
//   s2NarratorRect    with ?dir=1 the narrator circle grows on question beats
//                     ("…where did it begin?") — the host turns to the viewer
//
// All pure functions of time. On by default; ?fx=0 turns the layer off.
// window.STORY.fx = "rain" (etc.) overrides the atmosphere for a story.

const S2FX_GOLD = "#e9c46a";
const S2FX_WHITE = "#f4f1ea";
// weather covers all four seasons, so a rain layer would be wrong half the time
const S2FX_MOODS = { lighthouse: "beam", dreams: "stars", coffee: "steam", summer: "pollen", market: "dust", weather: "dust" };

function s2fxOn() {
  return new URLSearchParams(location.search).get("fx") !== "0";
}
function s2DirOn() {
  // narrator moves ON by default since 2026-10-12; ?dir=0 keeps the circle fixed
  return new URLSearchParams(location.search).get("dir") !== "0" && window.STORY.director !== false;
}
function s2Rand(i, salt) {
  const x = Math.sin(i * 127.1 + (salt || 0) * 311.7) * 43758.5453;
  return x - Math.floor(x);
}
function s2BeatEnd(beats, i) {
  return i + 1 < beats.length ? beats[i + 1].start : window.STORY.duration;
}

// ── camera moves ─────────────────────────────────────────────────────────────
function s2Move(i, p) {
  switch (i % 6) {
    case 0: return { s: 1.05 + 0.10 * p, x: 0, y: 0 };                  // push in
    case 1: return { s: 1.16 - 0.10 * p, x: 0, y: -6 + 12 * p };        // pull out
    case 2: return { s: 1.10, x: -34 + 68 * p, y: 0 };                  // pan right
    case 3: return { s: 1.10, x: 34 - 68 * p, y: 4 };                   // pan left
    case 4: return { s: 1.10 + 0.03 * p, x: 0, y: 24 - 48 * p };        // tilt up
    default: return { s: 1.06 + 0.07 * p, x: 20 - 40 * p, y: -10 + 20 * p }; // drift
  }
}

// ── word timing for a beat (no audio timings exist, so reading pace) ────────
function s2Words(beats, i) {
  const b = beats[i];
  const words = String(b.cap).split(/\s+/).filter(Boolean);
  const span = Math.min((s2BeatEnd(beats, i) - b.start) * 0.72, words.length * 0.46 + 0.4);
  const weight = words.map((w) => w.replace(/[^A-Za-z0-9]/g, "").length + 2);
  const total = weight.reduce((a, c) => a + c, 0) || 1;
  let t = b.start + 0.35;
  return words.map((w, k) => { const d = (span * weight[k]) / total; const o = { w, start: t, end: t + d }; t += d; return o; });
}

// 0..1 voice-ish envelope while the beat's words are being read
function s2Speech(beats, i, time) {
  const ws = s2Words(beats, i);
  for (let k = 0; k < ws.length; k++) {
    const w = ws[k];
    if (time >= w.start && time <= w.end + 0.08) return 0.55 + 0.45 * Math.sin(Math.PI * clamp((time - w.start) / (w.end - w.start), 0, 1));
  }
  return 0;
}

function S2KineticCap({ beats, i, time, style }) {
  const ws = s2Words(beats, i);
  return (
    <div style={style}>
      {ws.map((w, k) => {
        const e = clamp((time - w.start + 0.12) / 0.45, 0, 1);
        const ease = 1 - Math.pow(1 - e, 3);
        const reading = time >= w.start && time < w.end;
        return (
          <span key={k} style={{ display: "inline-block", whiteSpace: "pre", opacity: ease,   /* unread words stay invisible: a faint blurred ghost read as a smudge on the art */
            transform: `translateY(${(1 - ease) * 12}px)`, filter: ease < 1 ? `blur(${(1 - ease) * 5}px)` : "none",
            color: reading ? S2FX_GOLD : S2FX_WHITE }}>
            {w.w}{k < ws.length - 1 ? " " : ""}
          </span>
        );
      })}
    </div>
  );
}

// ── atmosphere ───────────────────────────────────────────────────────────────
function S2FXParticles({ time }) {
  const id = window.__EU_STORY || "";
  const mood = window.STORY.fx || S2FX_MOODS[id] || "dust";
  const out = [];
  if (mood === "beam") {
    // a lighthouse beam: a wide soft cone from beyond the top-right corner,
    // sweeping slowly across the sky — blurred, never a hard-edged wedge
    const a = -14 + 28 * (0.5 + 0.5 * Math.sin(time * (2 * Math.PI / 11)));
    const pulse = 0.75 + 0.25 * Math.sin(time * (2 * Math.PI / 5.5));
    out.push(<div key="beam" style={{ position: "absolute", left: 2050, top: -160, width: 2900, height: 700, marginTop: -350,
      transformOrigin: "0 50%", transform: `rotate(${158 + a}deg)`, mixBlendMode: "screen", filter: "blur(38px)", opacity: pulse,
      background: "radial-gradient(100% 50% at 0% 50%, rgba(255,236,190,0.30), rgba(255,236,190,0.10) 45%, transparent 75%)" }} />);
  }
  const n = { beam: 14, stars: 46, steam: 9, pollen: 34, dust: 30, rain: 70 }[mood] || 30;
  for (let i = 0; i < n; i++) {
    const r1 = s2Rand(i, 1), r2 = s2Rand(i, 2), r3 = s2Rand(i, 3);
    let st;
    if (mood === "rain") {
      const y = ((r2 * 1300 + time * (900 + r3 * 400)) % 1300) - 120;
      const x = r1 * 2100 - 90 - y * 0.18;
      st = { left: x, top: y, width: 1.4, height: 46 + r3 * 40, background: "rgba(200,220,235,0.22)", transform: "rotate(10deg)" };
    } else if (mood === "stars") {
      const tw = 0.5 + 0.5 * Math.sin(time * (0.8 + r3 * 1.6) + i);
      const sz = 1.5 + r3 * 3;
      st = { left: r1 * 1920 + 8 * Math.sin(time * 0.1 + i), top: r2 * 760, width: sz, height: sz, borderRadius: "50%",
        background: `rgba(255,248,225,${0.25 + 0.6 * tw})`, boxShadow: `0 0 ${sz * 4}px rgba(255,236,190,${0.5 * tw})` };
    } else if (mood === "steam") {
      const life = 7 + r3 * 3, p = ((time + r1 * life) % life) / life;
      const x = 1250 + r2 * 360 + 60 * Math.sin(p * 5 + i);
      st = { left: x, top: 900 - p * 700, width: 160 + p * 220, height: 160 + p * 220, borderRadius: "50%",
        background: `radial-gradient(circle, rgba(244,241,234,${0.12 * Math.sin(Math.PI * p)}), transparent 65%)`, filter: "blur(6px)" };
    } else {
      // dust / pollen: warm motes drifting up through the light
      const warm = mood === "pollen" ? "255,214,140" : "233,196,106";
      const y = 1100 - ((r2 * 1200 + time * (8 + r3 * 14)) % 1200);
      const sz = 1.5 + r3 * (mood === "pollen" ? 4 : 3);
      const tw = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(time * (0.7 + r1) + i));
      st = { left: r1 * 1920 + 50 * Math.sin(time * 0.08 + i), top: y, width: sz, height: sz, borderRadius: "50%",
        background: `rgba(${warm},${0.35 * tw})`, boxShadow: `0 0 ${sz * 5}px rgba(${warm},${0.3 * tw})` };
    }
    out.push(<div key={i} style={{ position: "absolute", ...st }} />);
  }
  return <div style={{ position: "absolute", inset: 0, zIndex: 35, pointerEvents: "none", overflow: "hidden" }}>{out}</div>;
}

// a warm wash across the frame as one image dissolves into the next
function S2FXLeak({ beats, cur, time }) {
  if (cur === 0) return null;
  const p = (time - beats[cur].start) / 1.8;
  if (p < 0 || p > 1) return null;
  const x = -30 + p * 160, a = Math.sin(Math.PI * p);
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 36, pointerEvents: "none", mixBlendMode: "screen",
      background: `radial-gradient(60% 90% at ${x}% 40%, rgba(255,190,110,${0.30 * a}), rgba(233,140,80,${0.10 * a}) 45%, transparent 70%)` }} />
  );
}

// the narrator circle, bigger on question beats when the director is on
function s2NarratorRect(beats, cur, time) {
  const N = SLOT_GEO.N;
  if (!s2DirOn()) return N;
  const ask = /\?\s*$/.test(beats[cur].cap);
  const t0 = beats[cur].start, t1 = s2BeatEnd(beats, cur);
  const g = ask ? clamp((time - t0 - 0.2) / 0.8, 0, 1) * clamp((t1 - time) / 0.8, 0, 1) : 0;
  const e = g * g * (3 - 2 * g);
  const d = N.w + 150 * e;                     // 306 → 456
  return { x: N.x, y: N.y + N.h - d - 20 * e, w: d, h: d, r: d / 2, shape: "circle", grow: e };
}

function S2FXRing({ rect, beats, cur, time, opacity }) {
  const s = s2Speech(beats, cur, time);
  const rings = [0, 1].map((k) => {
    const g = 8 + k * 14 + s * (10 + k * 8);
    return (
      <div key={k} style={{ position: "absolute", left: rect.x - g, top: rect.y - g, width: rect.w + 2 * g, height: rect.h + 2 * g,
        borderRadius: "50%", boxSizing: "border-box", border: `${k ? 1 : 1.5}px solid rgba(233,196,106,${(0.18 + 0.4 * s) * (k ? 0.5 : 1)})` }} />
    );
  });
  return <div style={{ position: "absolute", inset: 0, zIndex: 59, opacity, pointerEvents: "none" }}>{rings}</div>;
}

Object.assign(window, { s2fxOn, s2DirOn, s2Move, S2KineticCap, S2FXParticles, S2FXLeak, S2FXRing, s2NarratorRect });
