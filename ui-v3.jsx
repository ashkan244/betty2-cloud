// ui.jsx — English Unlocked · Episode 02 — meditative shadowing UI.
// Globals: Sprite, useTime, useTimeline, Easing, clamp (animations.jsx),
// window.EPISODE (data.jsx).

const DISPLAY = "'Newsreader', Georgia, serif";
const UI      = "'Hanken Grotesk', system-ui, sans-serif";
const MONO    = "'JetBrains Mono', ui-monospace, monospace";

const GOLD   = "#e9c46a";
const GOLD_D = "rgba(233,196,106,0.9)";
const WHITE  = "#f4f1ea";
const FUTURE = "rgba(244,241,234,0.30)";
const SLATE  = "#8fa3b0";              // third neutral — calm night-blue for guidance lines
const SLATE_FUT = "rgba(143,163,176,0.32)";
const EASE   = "cubic-bezier(0.22, 1, 0.36, 1)"; // soft arrive-and-settle

// Persistent closed-caption strip at the bottom (test). Flip to false to revert.
const SHOW_SUBTITLE = false;

// ── helpers ─────────────────────────────────────────────────────────────────
function activeLine(time) {
  const lines = window.EPISODE.lines;
  let cur = lines[0];
  for (let i = 0; i < lines.length; i++) {
    if (time >= lines[i].start) cur = lines[i];
  }
  // clamp to within its pause window for "current"
  return cur;
}

// Opacity envelope for the main stage: 0 during the intro card, ramps to 1 by
// the time the first line speaks, and fades back to 0 as the outro begins.
// The intro/outro cards own the screen outside [contentStart, contentEnd].
function contentOpacity(time) {
  const ep = window.EPISODE;
  if (ep.contentStart == null) return 1;   // older data files without framing
  const inA  = clamp((time - (ep.contentStart - 0.7)) / 0.7, 0, 1);
  const outA = clamp((time - ep.contentEnd) / 0.6, 0, 1);
  return inA * (1 - outA);
}

// ── film grain (subtle analog texture) ───────────────────────────────────────
function FilmGrain() {
  const time = useTime();
  // nudge the tile a few px each frame so grain shimmers like real film
  const tx = (Math.floor(time * 12) % 7) * 11;
  const ty = (Math.floor(time * 12 + 3) % 5) * 13;
  return (
    <div style={{ position: "absolute", inset: -40, pointerEvents: "none", opacity: 0.045, mixBlendMode: "overlay",
      transform: `translate(${tx}px, ${ty}px)`,
      backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
  );
}

// ── ambient background (calm night, slow drifting glow + subtle breath) ──────
function Background() {
  const time = useTime();
  const x = 50 + 6 * Math.sin(time * 0.07);
  const y = 40 + 4 * Math.cos(time * 0.05);
  // very subtle whole-scene breath so silence never feels frozen (~9s cycle)
  const breath = 1 + 0.015 * Math.sin(time * (2 * Math.PI / 9));
  return (
    <div style={{ position: "absolute", inset: 0, transform: `scale(${breath})`, transformOrigin: "50% 45%",
      background: `radial-gradient(120% 90% at ${x}% ${y}%, #1a2730 0%, #121a20 42%, #0a0e12 78%)` }}>
      <div style={{ position: "absolute", inset: 0, boxShadow: "inset 0 0 360px 80px rgba(5,8,11,0.7)" }} />
      <FilmGrain />
    </div>
  );
}

// ── brand + episode tag (reads epNumber/title off window.EPISODE) ─────────────
function Brand() {
  const time = useTime();
  const ep = window.EPISODE;
  const op = contentOpacity(time);                      // hidden while the cards own the screen
  if (op <= 0.001) return null;
  const epNum = ep.epNumber != null ? String(ep.epNumber).padStart(2, "0") : "";
  const epTitle = ep.title || "";
  return (
    <React.Fragment>
      <div style={{ position: "absolute", left: 84, top: 64, display: "flex", alignItems: "center", gap: 18, opacity: op }}>
        <div style={{ width: 48, height: 48, borderRadius: 13, border: `1.5px solid ${GOLD}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 15, height: 13, borderRadius: "4px 4px 2px 2px", border: `1.5px solid ${GOLD}`, borderBottom: "none", position: "relative", top: -3 }}>
            <div style={{ position: "absolute", left: -6, top: 9, width: 25, height: 16, borderRadius: 3, background: GOLD }} />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.05 }}>
          <span style={{ fontFamily: UI, fontSize: 31, fontWeight: 700, letterSpacing: "0.02em", color: WHITE }}>English</span>
          <span style={{ fontFamily: UI, fontSize: 31, fontWeight: 700, letterSpacing: "0.16em", color: GOLD, textTransform: "uppercase" }}>Unlocked</span>
        </div>
      </div>
      <div style={{ position: "absolute", right: 84, top: 72, textAlign: "right", opacity: op }}>
        {epNum && <div style={{ fontFamily: MONO, fontSize: 17, letterSpacing: "0.22em", color: "rgba(244,241,234,0.62)", textTransform: "uppercase" }}>{`Episode ${epNum}`}</div>}
        {epTitle && <div style={{ fontFamily: DISPLAY, fontStyle: "italic", fontSize: 28, color: "rgba(244,241,234,0.9)", marginTop: 5 }}>{epTitle}</div>}
      </div>
    </React.Fragment>
  );
}

// ── mic glyph ─────────────────────────────────────────────────────────────────
function Mic({ size = 26, color = GOLD }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="2" width="6" height="11" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <line x1="8" y1="21" x2="16" y2="21" />
    </svg>
  );
}

// ── ear glyph (listen pass) ───────────────────────────────────────
function Ear({ size = 26, color = GOLD }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8.5a6 6 0 0 1 12 0c0 2.5-1.5 3.5-2.6 4.6-1 1-1.4 1.7-1.4 2.9a2.5 2.5 0 0 1-5 0" />
      <path d="M9.5 8.5a2.5 2.5 0 0 1 5 0" />
    </svg>
  );
}

// ── bell glyph (subscribe hook on the outro) ─────────────────────────────────
function Bell({ size = 26, color = GOLD }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9a6 6 0 0 1 12 0c0 4.5 1.8 5.6 2.4 6.2A.6.6 0 0 1 20 16.5H4a.6.6 0 0 1-.4-1.3C4.2 14.6 6 13.5 6 9z" />
      <path d="M10 19.5a2.2 2.2 0 0 0 4 0" />
    </svg>
  );
}

// ── center stage: breathing orb OR Betty portrait, with countdown ring ───────
function CenterStage() {
  const time = useTime();
  const line = activeLine(time);
  const betty = line.bettyVisible;

  // breathing scale (calm ~9s cycle)
  const breath = 1 + 0.055 * Math.sin(time * (2 * Math.PI / 9));

  // very slow Ken Burns on the Betty portrait so the still photo feels alive
  const kb = 0.5 + 0.5 * Math.sin(time * (2 * Math.PI / 18));   // 0..1 over ~18s
  const bettyScale = 1.07 + 0.05 * kb;                          // gentle zoom
  const bettyShiftY = -7 * kb;                                  // tiny vertical drift

  // pause state
  const inPause = line.pause > 0 && time > line.end && time < line.pauseEnd;
  const pProg = inPause ? clamp((time - line.end) / line.pause, 0, 1) : 0;
  const remRaw = inPause ? line.pause - (time - line.end) : 0;
  const remaining = Math.max(0, Math.ceil(remRaw));
  const isRepeat = line.pauseType === "repeat";
  const isListen = line.pauseType === "listen";
  const showNow = isRepeat && inPause && remRaw <= 0.75;   // soft "go" cue on the final beat

  const R = 150, C = 2 * Math.PI * R;
  const CX = 960, CY = 372;

  return (
    <React.Fragment>
      {/* Betty portrait */}
      <div style={{ position: "absolute", left: CX - 165, top: CY - 165, width: 330, height: 330,
        opacity: betty ? 1 : 0, transform: `scale(${betty ? 1 : 0.92})`, transition: "opacity 700ms ease, transform 700ms ease" }}>
        <div style={{ position: "absolute", inset: -22, borderRadius: "50%", background: "radial-gradient(circle, rgba(233,196,106,0.22), transparent 70%)", filter: "blur(8px)" }} />
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", overflow: "hidden", boxShadow: "0 30px 70px -28px rgba(0,0,0,0.7)" }}>
          <img src="betty.jpg" alt="Betty" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 17%",
            transform: `scale(${bettyScale}) translateY(${bettyShiftY}px)`, transformOrigin: "50% 32%",
            filter: "contrast(1.06) saturate(0.82) brightness(0.84) sepia(0.22)" }} />
          {/* grade the bright wall into the night palette + warm her toward gold */}
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 36%, rgba(233,196,106,0.16), transparent 66%)", mixBlendMode: "soft-light" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 50%, rgba(10,14,18,0.66) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 40%, transparent 45%, rgba(10,14,18,0.62) 100%)" }} />
        </div>
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid rgba(233,196,106,0.4)", pointerEvents: "none" }} />
      </div>

      {/* Breathing orb */}
      <div style={{ position: "absolute", left: CX - 165, top: CY - 165, width: 330, height: 330,
        opacity: betty ? 0 : 1, transition: "opacity 700ms ease" }}>
        <div style={{ position: "absolute", inset: 0, transform: `scale(${breath})`, transformOrigin: "50% 50%" }}>
          <div style={{ position: "absolute", inset: 30, borderRadius: "50%",
            background: "radial-gradient(circle at 42% 38%, rgba(233,196,106,0.55), rgba(217,148,90,0.18) 55%, transparent 72%)",
            filter: "blur(6px)" }} />
          <div style={{ position: "absolute", inset: 78, borderRadius: "50%",
            background: "radial-gradient(circle at 45% 40%, rgba(255,236,196,0.85), rgba(233,196,106,0.35) 60%, transparent 75%)",
            filter: "blur(2px)" }} />
        </div>
        {/* idle thin ring */}
        <svg width="330" height="330" viewBox="0 0 330 330" style={{ position: "absolute", inset: 0 }}>
          <circle cx="165" cy="165" r={R} fill="none" stroke="rgba(244,241,234,0.12)" strokeWidth="2" />
          {inPause && (
            <circle cx="165" cy="165" r={R} fill="none" stroke={GOLD} strokeWidth="3.5" strokeLinecap="round"
              strokeDasharray={C} strokeDashoffset={C * pProg} transform="rotate(-90 165 165)"
              style={{ filter: `drop-shadow(0 0 8px ${GOLD})` }} />
          )}
        </svg>
      </div>

      {/* pause prompt under the stage — listen pass: ear + “just listen” (no countdown);
          repeat pass: mic + “your turn” + countdown */}
      <div style={{ position: "absolute", left: 0, right: 0, top: CY + 196, display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
        opacity: inPause && (isRepeat || isListen) ? 1 : 0, transition: "opacity 300ms ease" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {isRepeat ? <Mic size={24} /> : <Ear size={24} />}
          <span style={{ fontFamily: MONO, fontSize: 16, letterSpacing: "0.28em", textTransform: "uppercase", color: GOLD_D }}>
            {isRepeat ? "your turn — repeat" : "just listen"}
          </span>
        </div>
        <span style={{ fontFamily: MONO, fontSize: 34, fontWeight: 500, color: GOLD_D, fontVariantNumeric: "tabular-nums", letterSpacing: showNow ? "0.18em" : "0.04em",
          opacity: isRepeat ? 1 : 0, transition: "opacity 200ms ease" }}>{showNow ? "now" : String(remaining).padStart(2, "0")}</span>
      </div>
    </React.Fragment>
  );
}

// ── karaoke word ──────────────────────────────────────────────────────────────
function Word({ w, time, guide, enter }) {
  const past = time >= w.end;
  const current = time >= w.start && time < w.end;
  // phrase lines glow gold; guidance lines settle to a calm slate (reading hierarchy)
  const restColor = guide ? SLATE : WHITE;
  const futColor = guide ? SLATE_FUT : FUTURE;
  const color = current ? GOLD : past ? restColor : futColor;
  // staggered entrance: each word rises + fades in on its own slight delay
  const e = enter == null ? 1 : enter;
  return (
    <span style={{ color, marginRight: "0.28em", display: "inline-block",
      opacity: e, transform: `translateY(${(1 - e) * 18}px)`,
      textShadow: current ? "0 0 24px rgba(233,196,106,0.5)" : "none",
      transition: "color 240ms ease, text-shadow 240ms ease" }}>{w.text}</span>
  );
}

// ── current line caption ──────────────────────────────────────────────────────
function Caption() {
  const time = useTime();
  const lines = window.EPISODE.lines;
  let idx = 0;
  for (let i = 0; i < lines.length; i++) if (time >= lines[i].start) idx = i;

  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 660, height: 230,
      display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
      {lines.map((l, i) => {
        const show = i === idx;
        const phrase = l.phrase;
        // long practice phrases (e.g. the Ep10 simulation lines) shrink so they
        // never spill past the caption band; short phrases stay at the full 76px.
        const plen = (l.text || "").length;
        const phraseSize = phrase ? (plen > 52 ? Math.max(46, Math.round(76 * 52 / plen)) : 76) : 50;
        // eased arrive-and-settle: gentle container fade; per-word stagger does the motion
        const since = time - l.start;
        const enter = show ? clamp(since / 0.55, 0, 1) : 0;
        const rise = show ? (1 - Easing.easeOutCubic(enter)) * 10 : 14;
        // gentle "still alive" breath while a line is held through its pause
        const inPause = show && l.pause > 0 && time > l.end;
        const breath = inPause ? 1 + 0.012 * Math.sin((time - l.end) * (2 * Math.PI / 4.5)) : 1;
        const breathOp = inPause ? 0.92 + 0.08 * (0.5 + 0.5 * Math.sin((time - l.end) * (2 * Math.PI / 4.5))) : 1;
        return (
          <div key={i} style={{
            position: show ? "relative" : "absolute",
            opacity: show ? enter * breathOp : 0,
            transform: `translateY(${rise}px) scale(${breath})`,
            transition: `opacity 420ms ${EASE}, transform 520ms ${EASE}`,
            fontFamily: DISPLAY,
            fontStyle: phrase ? "italic" : "normal",
            fontSize: phraseSize,
            fontWeight: phrase ? 500 : 400,
            lineHeight: 1.45, textAlign: "center", maxWidth: 1480, textWrap: "balance",
            padding: "0 120px", pointerEvents: "none",
          }}>
            {show ? l.words.map((w, wi) => {
              // stagger: word wi begins entering 80ms after the previous one
              const wEnter = Easing.easeOutCubic(clamp((since - wi * 0.08) / 0.42, 0, 1));
              return <Word key={wi} w={w} time={time} guide={!phrase} enter={wEnter} />;
            }) : null}
          </div>
        );
      })}
    </div>
  );
}

// ── phase rail (6 chapters) ───────────────────────────────────────────────────
function PhaseRail() {
  const time = useTime();
  const line = activeLine(time);
  const phases = window.EPISODE.phases;
  const curN = line.phase;
  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 80, display: "flex", justifyContent: "center" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
        {phases.map((p, i) => {
          const active = p.n === curN;
          const done = p.n < curN;
          return (
            <React.Fragment key={p.key}>
              <div style={{ display: "flex", alignItems: "center", gap: 13, opacity: active ? 1 : done ? 0.55 : 0.32, transition: "opacity 400ms ease" }}>
                <span style={{ width: active ? 12 : 8, height: active ? 12 : 8, borderRadius: 9,
                  background: active || done ? GOLD : "transparent",
                  border: active || done ? "none" : "1.5px solid rgba(244,241,234,0.5)",
                  boxShadow: active ? `0 0 12px ${GOLD}` : "none", transition: "all 400ms ease" }} />
                <span style={{ fontFamily: UI, fontSize: 23, fontWeight: active ? 600 : 500,
                  color: active ? WHITE : "rgba(244,241,234,0.78)", letterSpacing: "0.01em", whiteSpace: "nowrap" }}>
                  {p.label}
                </span>
              </div>
              {i < phases.length - 1 && <span style={{ width: 40, height: 1, background: "rgba(244,241,234,0.2)", margin: "0 20px" }} />}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

// ── persistent subtitle strip (closed-caption style, for muted mobile viewers) ─
function PersistentSubtitle() {
  const time = useTime();
  const line = activeLine(time);
  const text = (line.text || "").replace(/\u2026/g, "…");
  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 52, display: "flex", justifyContent: "center", pointerEvents: "none" }}>
      <div style={{ maxWidth: 1180, padding: "12px 30px", borderRadius: 12,
        background: "rgba(10,14,18,0.7)", backdropFilter: "blur(6px)",
        border: "1px solid rgba(244,241,234,0.08)",
        fontFamily: UI, fontSize: 30, fontWeight: 500, color: "rgba(244,241,234,0.92)",
        textAlign: "center", lineHeight: 1.3, textWrap: "balance" }}>
        {text}
      </div>
    </div>
  );
}

// ── progress bar ──────────────────────────────────────────────────────────────
function ProgressBar() {
  const time = useTime();
  const { duration } = useTimeline();
  const pct = clamp(time / duration, 0, 1) * 100;
  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 4, background: "rgba(244,241,234,0.1)" }}>
      <div style={{ height: "100%", width: `${pct}%`, background: GOLD, boxShadow: `0 0 14px ${GOLD}` }} />
    </div>
  );
}

// ── English-to-English vocab card (calm moments only, lower-left) ───────────
function VocabCards() {
  const vocab = window.EPISODE.vocab || [];
  return vocab.map((v, i) => (
    <Sprite key={i} start={v.show} end={v.hide}>
      {({ localTime, duration }) => {
        const inP = clamp(localTime / 0.55, 0, 1);
        const inE = Easing.easeOutCubic(inP);
        const exitStart = duration - 0.5;
        const outP = localTime > exitStart ? clamp((localTime - exitStart) / 0.5, 0, 1) : 0;
        const op = inP * (1 - outP);
        const tx = (1 - inE) * -36 + outP * -20;
        return (
          <div style={{ position: "absolute", left: 84, top: 408, width: 372, transform: `translateX(${tx}px)`, opacity: op,
            background: "rgba(18,26,32,0.82)", backdropFilter: "blur(8px)", borderRadius: 18, padding: "22px 26px",
            border: "1px solid rgba(233,196,106,0.22)", boxShadow: "0 24px 60px -28px rgba(0,0,0,0.8)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 13 }}>
              <span style={{ width: 7, height: 7, borderRadius: 7, background: GOLD }} />
              <span style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.22em", textTransform: "uppercase", color: GOLD_D }}>vocabulary</span>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
              <span style={{ fontFamily: DISPLAY, fontSize: 38, fontWeight: 600, color: WHITE, letterSpacing: "-0.01em" }}>{v.word}</span>
              <span style={{ fontFamily: UI, fontSize: 15, fontWeight: 500, fontStyle: "italic", color: SLATE }}>{v.pos}</span>
            </div>
            <div style={{ height: 1, background: "rgba(244,241,234,0.1)", margin: "14px 0 13px" }} />
            <div style={{ fontFamily: UI, fontSize: 21, fontWeight: 500, lineHeight: 1.4, color: "rgba(244,241,234,0.9)" }}>{v.def}</div>
          </div>
        );
      }}
    </Sprite>
  ));
}

// ── reusable lock/book brand mark (scales with size) ─────────────────────────
function BrandMark({ size = 48, glow = false }) {
  const k = size / 48;
  return (
    <div style={{ width: size, height: size, borderRadius: 13 * k, border: `${1.5 * k}px solid ${GOLD}`,
      display: "flex", alignItems: "center", justifyContent: "center",
      boxShadow: glow ? `0 0 ${52 * k}px -${10 * k}px ${GOLD_D}` : "none" }}>
      <div style={{ width: 15 * k, height: 13 * k, borderRadius: `${4 * k}px ${4 * k}px ${2 * k}px ${2 * k}px`,
        border: `${1.5 * k}px solid ${GOLD}`, borderBottom: "none", position: "relative", top: -3 * k }}>
        <div style={{ position: "absolute", left: -6 * k, top: 9 * k, width: 25 * k, height: 16 * k, borderRadius: 3 * k, background: GOLD }} />
      </div>
    </div>
  );
}

// ── main stage: orb/Betty, captions, vocab, rail — fades with the content window ─
function MainContent() {
  const time = useTime();
  const op = contentOpacity(time);
  if (op <= 0.001) return null;            // the intro/outro cards own the screen
  return (
    <div style={{ position: "absolute", inset: 0, opacity: op }}>
      <CenterStage />
      <VocabCards />
      <Caption />
      <PhaseRail />
      {SHOW_SUBTITLE && <PersistentSubtitle />}
    </div>
  );
}

// ── intro title card (calm branded reveal) ───────────────────────────────────
function IntroCard() {
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
            alignItems: "center", justifyContent: "center", opacity: op,
            transform: `translateY(${rise}px)`, pointerEvents: "none" }}>
            <div style={{ marginBottom: 36 }}><BrandMark size={88} glow /></div>
            <div style={{ display: "flex", gap: 18, alignItems: "baseline" }}>
              <span style={{ fontFamily: UI, fontSize: 66, fontWeight: 700, letterSpacing: "0.02em", color: WHITE }}>English</span>
              <span style={{ fontFamily: UI, fontSize: 66, fontWeight: 700, letterSpacing: "0.16em", color: GOLD, textTransform: "uppercase" }}>Unlocked</span>
            </div>
            <div style={{ width: 120, height: 1, background: "rgba(233,196,106,0.5)", margin: "40px 0 32px" }} />
            {epNum && <div style={{ fontFamily: MONO, fontSize: 22, letterSpacing: "0.34em", color: SLATE, textTransform: "uppercase" }}>{`Episode ${epNum}`}</div>}
            {ep.title && <div style={{ fontFamily: DISPLAY, fontStyle: "italic", fontWeight: 500, fontSize: 60, color: "rgba(244,241,234,0.95)", marginTop: 18, textAlign: "center" }}>{ep.title}</div>}
          </div>
        );
      }}
    </Sprite>
  );
}

// ── outro card (gentle close + subscribe hook) ───────────────────────────────
function OutroCard() {
  const ep = window.EPISODE;
  if (!ep.outro) return null;
  return (
    <Sprite start={ep.outro.start} end={ep.outro.end}>
      {({ localTime, duration }) => {
        const inE = Easing.easeOutCubic(clamp(localTime / 1.2, 0, 1));
        const outStart = duration - 0.7;
        const outP = localTime > outStart ? clamp((localTime - outStart) / 0.7, 0, 1) : 0;
        const op = inE * (1 - outP);
        const rise = (1 - inE) * 20;
        return (
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", opacity: op,
            transform: `translateY(${rise}px)`, pointerEvents: "none" }}>
            <div style={{ fontFamily: DISPLAY, fontStyle: "italic", fontWeight: 500, fontSize: 62, color: WHITE, textAlign: "center", lineHeight: 1.32 }}>
              Take a breath.<br />You did well today.
            </div>
            <div style={{ width: 110, height: 1, background: "rgba(233,196,106,0.45)", margin: "46px 0 36px" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <Bell size={28} />
              <span style={{ fontFamily: UI, fontSize: 30, fontWeight: 500, color: "rgba(244,241,234,0.9)" }}>Subscribe to keep your English unlocked.</span>
            </div>
            <div style={{ display: "flex", gap: 13, alignItems: "baseline", marginTop: 42 }}>
              <span style={{ fontFamily: UI, fontSize: 26, fontWeight: 700, letterSpacing: "0.02em", color: WHITE }}>English</span>
              <span style={{ fontFamily: UI, fontSize: 26, fontWeight: 700, letterSpacing: "0.16em", color: GOLD, textTransform: "uppercase" }}>Unlocked</span>
            </div>
          </div>
        );
      }}
    </Sprite>
  );
}

function EpisodeTwo() {
  return (
    <React.Fragment>
      <Background />
      <Brand />
      <MainContent />
      <IntroCard />
      <OutroCard />
      <ProgressBar />
    </React.Fragment>
  );
}

Object.assign(window, { EpisodeThreeV3: EpisodeTwo });
