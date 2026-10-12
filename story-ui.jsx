// story-ui.jsx — English Unlocked · "Slow Story" slideshow visual (1920x1080).
// Painterly image beats crossfade with a slow Ken Burns; one caption per beat.
// Reads window.STORY (story-data.jsx). English ONLY on screen.

const ST_DISPLAY = "'Newsreader', Georgia, serif";
const ST_UI = "'Hanken Grotesk', system-ui, sans-serif";
const ST_MONO = "'JetBrains Mono', ui-monospace, monospace";
const ST_WHITE = "#f4f1ea";
const ST_GOLD = "#e9c46a";
const ST_SLATE = "#8fa3b0";

function stClamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

function StorySlide({ beat, opacity, time }) {
  const kb = stClamp((time - beat.start) / beat.imgDur, 0, 1);
  const z0 = 1.05 + (beat.i % 3) * 0.01;
  const scale = z0 + 0.09 * kb;
  const dir = beat.i % 2 === 0 ? 1 : -1;
  const tx = dir * (kb * 30 - 15);
  const ty = -(kb * 16 - 8);
  return (
    <div style={{ position: "absolute", inset: 0, opacity, zIndex: beat.i }}>
      <div style={{ position: "absolute", inset: "-2.5%", transform: `scale(${scale}) translate(${tx}px, ${ty}px)`, willChange: "transform" }}>
        <img src={beat.img} draggable={false} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>
    </div>
  );
}

function SlideStoryDeck() {
  const time = useTime();
  const ST = window.STORY;
  const beats = ST.beats;
  const CROSS = ST.cross;
  const V = !!ST.vertical;  // 9:16 short vs 16:9 long

  let cur = 0;
  for (let i = 0; i < beats.length; i++) { if (time >= beats[i].start) cur = i; }
  const curFade = stClamp((time - beats[cur].start) / CROSS, 0, 1);
  const prev = cur - 1;

  const capOp = stClamp((time - beats[cur].start - 0.25) / 0.6, 0, 1);
  const introOp = stClamp(time / 0.8, 0, 1);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#0a0e12" }}>
      {/* previous slide (visible only while the current one is fading in) */}
      {prev >= 0 && curFade < 1 && <StorySlide beat={beats[prev]} opacity={1} time={time} />}
      {/* current slide */}
      <StorySlide beat={beats[cur]} opacity={curFade} time={time} />

      {/* vignette */}
      <div style={{ position: "absolute", inset: 0, zIndex: 50, pointerEvents: "none", background: "radial-gradient(120% 90% at 50% 46%, rgba(0,0,0,0) 55%, rgba(6,8,11,0.6) 100%)" }} />
      {/* caption scrim */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: V ? 620 : 360, zIndex: 60, background: "linear-gradient(to bottom, rgba(8,11,15,0) 0%, rgba(8,11,15,0.82) 78%)" }} />

      {/* chrome */}
      <div style={{ position: "absolute", top: 58, left: 0, right: 0, textAlign: "center", zIndex: 70, opacity: introOp }}>
        <div style={{ fontFamily: ST_UI, fontWeight: 600, fontSize: 26, letterSpacing: "0.4em", color: "rgba(244,241,234,0.72)" }}>
          ENGLISH <span style={{ color: ST_GOLD }}>UNLOCKED</span>
        </div>
        <div style={{ marginTop: 10, fontFamily: ST_MONO, fontSize: 20, letterSpacing: "0.22em", color: "rgba(143,163,176,0.85)" }}>
          SLOW STORIES · {ST.title.toUpperCase()}
        </div>
      </div>

      {/* caption */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: V ? 300 : 96, padding: V ? "0 80px" : "0 260px", textAlign: "center", zIndex: 70,
        opacity: capOp, fontFamily: ST_DISPLAY, fontStyle: "italic", fontWeight: 500, fontSize: V ? 62 : 60, lineHeight: 1.34,
        color: ST_WHITE, textShadow: "0 4px 26px rgba(0,0,0,0.85)" }}>
        {beats[cur].cap}
      </div>

      {/* progress */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 6, zIndex: 80, background: "rgba(244,241,234,0.10)" }}>
        <div style={{ height: "100%", width: `${stClamp(time / ST.duration, 0, 1) * 100}%`, background: ST_GOLD }} />
      </div>
    </div>
  );
}

Object.assign(window, { SlideStoryDeck });
