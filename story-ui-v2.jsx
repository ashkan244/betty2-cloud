// story-ui-v2.jsx — English Unlocked · "Slow Story" · the NARRATOR layout.
//
// The painterly art stays the hero, full-bleed. The host is present as a
// circular narrator window bottom-left, and the caption moved from centred to
// LEFT-ALIGNED beside it — a documentary composition instead of a subtitle band.
//
// What changed vs story-ui.jsx (v1):
//   · top scrim added — the brand no longer vanishes into a bright sky
//   · caption left-aligned beside the narrator, not centred over the art
//   · narrator circle (slot N, see slot.jsx) + NARRATOR label
//   · optional vocab chip under the caption (teaching beat + visual variety)
//   · beat ticks top-right instead of a raw progress bar
//   · optional full-frame BOOKENDS: you on camera at the start and the end
//
// Bookends: window.STORY.bookend = { in: 8, out: 10 }  (seconds), or ?book=8,10
// Reads window.STORY (story-data.jsx) and slot.jsx. English ONLY on screen.

const S2_DISPLAY = "'Newsreader', Georgia, serif";
const S2_UI = "'Hanken Grotesk', system-ui, sans-serif";
const S2_MONO = "'JetBrains Mono', ui-monospace, monospace";
const S2_WHITE = "#f4f1ea";
const S2_GOLD = "#e9c46a";
const S2_SLATE = "#8fa3b0";

function s2Clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

function s2Bookend() {
  const q = new URLSearchParams(location.search).get("book");
  if (q) {
    const p = q.split(",").map(Number);
    return { in: p[0] || 0, out: p[1] || 0 };
  }
  const b = window.STORY.bookend;
  return { in: (b && b.in) || 0, out: (b && b.out) || 0 };
}

// ── one art beat with its slow Ken Burns ─────────────────────────────────────
function S2Slide({ beat, opacity, time }) {
  const kb = s2Clamp((time - beat.start) / beat.imgDur, 0, 1);
  const z0 = 1.05 + (beat.i % 3) * 0.01;
  let scale = z0 + 0.09 * kb;
  const dir = beat.i % 2 === 0 ? 1 : -1;
  let tx = dir * (kb * 30 - 15);
  let ty = -(kb * 16 - 8);
  if ((window.s2fxOn && s2fxOn())) { const m = s2Move(beat.i, kb); scale = m.s; tx = m.x; ty = m.y; }   // story-fx.jsx: six moves
  return (
    <div style={{ position: "absolute", inset: 0, opacity, zIndex: beat.i }}>
      <div style={{ position: "absolute", inset: "-2.5%", transform: `scale(${scale}) translate(${tx}px, ${ty}px)`, willChange: "transform" }}>
        <img src={beat.img} draggable={false} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>
    </div>
  );
}

// ── brand lockup ─────────────────────────────────────────────────────────────
function S2Lockup() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
      <div style={{ width: 40, height: 40, borderRadius: 11, border: `1.4px solid ${S2_GOLD}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 13, height: 11, borderRadius: "3px 3px 2px 2px", border: `1.4px solid ${S2_GOLD}`, borderBottom: "none", position: "relative", top: -3 }}>
          <div style={{ position: "absolute", left: -5, top: 8, width: 21, height: 14, borderRadius: 3, background: S2_GOLD }} />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.05 }}>
        <span style={{ fontFamily: S2_UI, fontSize: 24, fontWeight: 700, color: S2_WHITE }}>English</span>
        <span style={{ fontFamily: S2_UI, fontSize: 24, fontWeight: 700, letterSpacing: "0.17em", color: S2_GOLD }}>UNLOCKED</span>
      </div>
    </div>
  );
}

// ── beat ticks (how far through the story) ───────────────────────────────────
function S2Beats({ beats, cur }) {
  return (
    <div style={{ display: "flex", gap: 7, alignItems: "center", justifyContent: "flex-end", marginTop: 12 }}>
      {beats.map((b, i) => (
        <span key={i} style={{ width: i === cur ? 34 : 20, height: 3, display: "block",
          background: i <= cur ? S2_GOLD : "rgba(244,241,234,0.28)", transition: "all 500ms ease" }} />
      ))}
    </div>
  );
}

// ── the deck ─────────────────────────────────────────────────────────────────
function NarratorStoryDeck() {
  const time = useTime();
  const ST = window.STORY;
  const beats = ST.beats;
  const CROSS = ST.cross;
  const BK = s2Bookend();
  const N = SLOT_GEO.N;

  let cur = 0;
  for (let i = 0; i < beats.length; i++) if (time >= beats[i].start) cur = i;
  const curFade = s2Clamp((time - beats[cur].start) / CROSS, 0, 1);
  const prev = cur - 1;

  const capOp = s2Clamp((time - beats[cur].start - 0.25) / 0.6, 0, 1);
  const introOp = s2Clamp(time / 0.8, 0, 1);

  // full-frame bookends: host on camera at the very start and the very end
  const outStart = ST.duration - BK.out;
  const inBook = BK.in > 0 && time < BK.in;
  const inOutro = BK.out > 0 && time > outStart;
  const bookOp = inBook ? 1 - s2Clamp((time - (BK.in - 0.8)) / 0.8, 0, 1)
    : inOutro ? s2Clamp((time - outStart) / 0.8, 0, 1) : 0;

  // narrator circle: grows on question beats with ?dir=1 (story-fx.jsx)
  const NR = window.s2NarratorRect ? s2NarratorRect(beats, cur, time) : N;
  const chip = (ST.chips || []).find((c) => time >= c.start && time <= c.end);
  const chipOp = chip ? s2Clamp((time - chip.start) / 0.5, 0, 1) * s2Clamp((chip.end - time) / 0.5, 0, 1) : 0;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#0a0e12" }}>
      {prev >= 0 && curFade < 1 && <S2Slide beat={beats[prev]} opacity={1} time={time} />}
      <S2Slide beat={beats[cur]} opacity={curFade} time={time} />

      {/* scrims — left for the narrator column, top for the brand, bottom for the caption */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 980, zIndex: 40,
        background: "linear-gradient(to right, rgba(6,9,13,0.80), rgba(6,9,13,0.30) 55%, transparent)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, top: 0, height: 230, zIndex: 40,
        background: "linear-gradient(to bottom, rgba(6,9,13,0.78), transparent)" }} />
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 560, zIndex: 40,
        background: "linear-gradient(to top, rgba(6,9,13,0.94) 6%, rgba(6,9,13,0.72) 38%, transparent 100%)" }} />

      {(window.s2fxOn && s2fxOn()) && <S2FXParticles time={time} />}
      {(window.s2fxOn && s2fxOn()) && <S2FXLeak beats={beats} cur={cur} time={time} />}

      {/* header */}
      <div style={{ position: "absolute", left: 78, right: 78, top: 58, zIndex: 70, opacity: introOp,
        display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <S2Lockup />
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: S2_MONO, fontSize: 17, letterSpacing: "0.26em", color: "rgba(143,163,176,0.85)", textTransform: "uppercase" }}>
            {`Slow Stories · ${ST.title}`}
          </div>
          <S2Beats beats={beats} cur={cur} />
        </div>
      </div>

      {/* narrator window */}
      {(window.s2fxOn && s2fxOn()) && <S2FXRing rect={NR} beats={beats} cur={cur} time={time} opacity={1 - bookOp} />}
      <CamSlot rect={NR} name="N" time={time} opacity={1 - bookOp} objectPosition="50% 20%" zIndex={60} />
      <div style={{ position: "absolute", left: NR.x, top: NR.y + NR.h + 26, width: NR.w, textAlign: "center", zIndex: 70,
        fontFamily: S2_MONO, fontSize: 16, letterSpacing: "0.28em", color: "rgba(233,196,106,0.85)", opacity: 1 - bookOp }}>
        NARRATOR
      </div>

      {/* caption — left-aligned beside the narrator */}
      {(window.s2fxOn && s2fxOn())
        ? <S2KineticCap beats={beats} i={cur} time={time} style={{ position: "absolute", left: NR.x + NR.w + 54, right: 150, bottom: 196, zIndex: 70,
            opacity: s2Clamp((time - beats[cur].start) / 0.3, 0, 1) * (1 - bookOp),
            fontFamily: S2_DISPLAY, fontStyle: "italic", fontWeight: 500, fontSize: 62, lineHeight: 1.3, textShadow: "0 4px 30px rgba(0,0,0,0.9)" }} />
        : <div style={{ position: "absolute", left: 452, right: 150, bottom: 196, zIndex: 70, opacity: capOp * (1 - bookOp),
            fontFamily: S2_DISPLAY, fontStyle: "italic", fontWeight: 500, fontSize: 62, lineHeight: 1.3,
            color: S2_WHITE, textShadow: "0 4px 30px rgba(0,0,0,0.9)" }}>
            {beats[cur].cap}
          </div>}

      {/* optional vocab chip */}
      {chip && (
        <div style={{ position: "absolute", left: 452, bottom: 120, zIndex: 70, opacity: chipOp * (1 - bookOp),
          display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ width: 2, height: 28, background: "rgba(233,196,106,0.6)" }} />
          <span style={{ fontFamily: S2_UI, fontWeight: 600, fontSize: 25, color: S2_GOLD }}>{chip.word}</span>
          <span style={{ fontFamily: S2_UI, fontWeight: 400, fontSize: 23, color: "rgba(244,241,234,0.8)" }}>{chip.def}</span>
        </div>
      )}

      {/* full-frame bookend (host on camera, start + end) */}
      {bookOp > 0.001 && (
        <React.Fragment>
          <CamSlot rect={{ x: 0, y: 0, w: 1920, h: 1080, r: 0, shape: "rect" }} name="BOOKEND" time={time} opacity={bookOp} zIndex={75} />
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 150, zIndex: 80, textAlign: "center", opacity: bookOp }}>
            <div style={{ fontFamily: S2_MONO, fontSize: 19, letterSpacing: "0.3em", color: "rgba(233,196,106,0.9)", textTransform: "uppercase" }}>
              {inBook ? "Slow Stories" : "Thank you for listening"}
            </div>
            <div style={{ fontFamily: S2_DISPLAY, fontStyle: "italic", fontWeight: 500, fontSize: 72, color: S2_WHITE, marginTop: 18 }}>
              {inBook ? ST.title : "See you in the next story."}
            </div>
          </div>
        </React.Fragment>
      )}

      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 5, zIndex: 90, background: "rgba(244,241,234,0.10)" }}>
        <div style={{ height: "100%", width: `${s2Clamp(time / ST.duration, 0, 1) * 100}%`, background: S2_GOLD }} />
      </div>
    </div>
  );
}

Object.assign(window, { NarratorStoryDeck });
