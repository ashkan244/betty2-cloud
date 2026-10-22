// Short.tsx — English Unlocked vertical short, Remotion style "Cinematic Pop".
//
// Everything is driven by public/<id>/data.json (render/shorts-prep.mjs): Betty's lines with
// word timings measured from her own voice, the echo cue of every pause, the cut points.
// Layout (1080×1920), kept clear of the Shorts UI (right action column, bottom title strip):
//   top      brand chip · headline · sub
//   card     Betty, 960×960 square (no upscaling), slow push-in per line, gold rim
//   captions word-by-word "pop" (active word gold, springs up), phrases in Newsreader italic
//   cues     "YOUR TURN" pill with a countdown ring in repeat pauses, "JUST LISTEN" on listen lines
// No CSS animations anywhere: every value is a function of the frame (Remotion rule).
import React from "react";
import {
  AbsoluteFill, Easing, OffthreadVideo, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig,
} from "remotion";
import { loadFont as loadNews } from "@remotion/google-fonts/Newsreader";
import { loadFont as loadHanken } from "@remotion/google-fonts/HankenGrotesk";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";

const { fontFamily: NEWS } = loadNews("italic", { weights: ["400", "500"], subsets: ["latin"] });
const { fontFamily: HANKEN } = loadHanken("normal", { weights: ["500", "600", "700"], subsets: ["latin"] });
const { fontFamily: MONO } = loadMono("normal", { weights: ["500"], subsets: ["latin"] });

const GOLD = "#e9c46a", WHITE = "#f4f1ea", SLATE = "#8fa3b0", NIGHT = "#0a0e12";
const CARD = { x: 60, y: 392, s: 960 };
const EASE = Easing.bezier(0.22, 1, 0.36, 1);

export type Word = { text: string; start: number; end: number };
export type Line = { text: string; start: number; end: number; pauseEnd: number; pass: "listen" | "repeat" | null;
  phrase: boolean; n: number; hook?: boolean; words: Word[] };
export type ShortData = { id: string; episode: number; title: string; headline: string; sub: string; cue: string; cta: string;
  fps: number; duration: number; phrases: number; cuts: number[]; lines: Line[] };
export type ShortProps = { id: string; data?: ShortData };

const clampI = (f: number, a: number[], b: number[], ease = EASE) =>
  interpolate(f, a, b, { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: ease });

function activeLine(lines: Line[], t: number): Line | null {
  let cur: Line | null = null;
  for (const l of lines) if (t >= l.start - 0.12) cur = l;   // a hair early: the caption leads the voice
  return cur;
}

const Mic: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round">
    <rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
  </svg>
);
const Ear: React.FC<{ size: number; color: string }> = ({ size, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2} strokeLinecap="round">
    <path d="M6 9a6 6 0 1 1 12 0c0 3-2 4-3 5.5S14 18 12 20a3 3 0 0 1-4-1" /><path d="M9.5 9.5a2.5 2.5 0 0 1 5 0c0 1.5-1.5 2-1.5 3.5" />
  </svg>
);

export const Short: React.FC<ShortProps> = ({ id, data }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  if (!data) return <AbsoluteFill style={{ background: NIGHT }} />;
  const t = frame / fps;
  const clip = staticFile(`${id}/clip.mp4`);
  const line = activeLine(data.lines, t);
  const lf = line ? Math.round((t - line.start) * fps) : 0;          // frames since the line began
  const inPause = !!line && t > line.end + 0.05 && t < line.pauseEnd;
  const repeatPause = inPause && line!.pass === "repeat";

  // ── camera: a slow push-in through each line, a small bump on every cut ──
  const lineDur = line ? Math.max(0.5, line.pauseEnd - line.start) : 1;
  const push = line ? clampI(t - line.start, [0, lineDur], [0, 1], Easing.linear) : 0;
  const cutAge = Math.min(...[99, ...data.cuts.map((c) => (t >= c ? t - c : 99))]);
  const bump = clampI(cutAge, [0, 0.35], [0.05, 0]);
  const zoom = 1.02 + 0.045 * push + bump + (repeatPause ? 0.02 : 0);
  const flash = clampI(cutAge, [0, 0.25], [0.55, 0]);

  // ── entrances ──
  const intro = clampI(frame, [0, 14], [0, 1]);
  const outroAt = data.duration - 2.4;
  const cta = clampI(t, [outroAt, outroAt + 0.5], [0, 1]);

  // ── caption sizing: phrases big italic serif, narration sans ──
  const txt = line?.text || "";
  // target phrases, the hook and quoted dialogue ("…" — "…") get the big italic serif
  const isPhrase = !!line?.phrase || !!line?.hook || /^[“"]/.test(txt);
  const size = isPhrase ? (txt.length > 44 ? 62 : txt.length > 32 ? 70 : 78) : (txt.length > 48 ? 46 : 52);
  const capIn = clampI(lf, [0, 9], [0, 1]);

  return (
    <AbsoluteFill style={{ background: NIGHT }}>
      {/* backdrop: Betty herself, blurred and dark, so the frame is never flat */}
      <AbsoluteFill style={{ transform: "scale(1.35)", filter: "blur(46px) brightness(0.32) saturate(0.9)" }}>
        <OffthreadVideo src={clip} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: `radial-gradient(90% 60% at 50% 38%, transparent 0%, ${NIGHT}cc 70%, ${NIGHT} 100%)` }} />

      {/* progress */}
      <div style={{ position: "absolute", left: 60, right: 60, top: 54, height: 6, borderRadius: 3, background: "rgba(244,241,234,0.12)" }}>
        <div style={{ width: `${(frame / durationInFrames) * 100}%`, height: "100%", borderRadius: 3, background: GOLD }} />
      </div>

      {/* header */}
      <div style={{ position: "absolute", left: 60, right: 60, top: 104, opacity: intro, transform: `translateY(${(1 - intro) * -24}px)` }}>
        <div style={{ fontFamily: MONO, fontSize: 24, letterSpacing: "0.22em", color: GOLD }}>ENGLISH UNLOCKED · EP {data.episode}</div>
        <div style={{ fontFamily: NEWS, fontStyle: "italic", fontSize: 76, lineHeight: 1.05, color: WHITE, marginTop: 14 }}>{data.headline}</div>
        <div style={{ fontFamily: HANKEN, fontWeight: 500, fontSize: 34, color: SLATE, marginTop: 10 }}>{data.sub}</div>
      </div>

      {/* the card */}
      <div style={{ position: "absolute", left: CARD.x, top: CARD.y, width: CARD.s, height: CARD.s, borderRadius: 48, overflow: "hidden",
        boxShadow: `0 50px 110px -30px rgba(0,0,0,0.9), 0 0 0 2px rgba(233,196,106,${repeatPause ? 0.9 : 0.42}), 0 0 ${repeatPause ? 90 : 40}px -10px rgba(233,196,106,${repeatPause ? 0.55 : 0.18})`,
        opacity: clampI(frame, [0, 10], [0, 1]) }}>
        <div style={{ position: "absolute", inset: 0, transform: `scale(${zoom})`, transformOrigin: "50% 34%" }}>
          <OffthreadVideo src={clip} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(6,9,13,0.75) 0%, transparent 32%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "white", opacity: flash }} />

        {/* phrase counter */}
        {line?.phrase && data.phrases > 1 && (
          <div style={{ position: "absolute", left: 28, top: 28, padding: "10px 20px", borderRadius: 999, background: "rgba(10,14,18,0.72)",
            border: "1px solid rgba(233,196,106,0.5)", fontFamily: MONO, fontSize: 26, letterSpacing: "0.16em", color: GOLD }}>
            {String(line.n).padStart(2, "0")} / {String(data.phrases).padStart(2, "0")}
          </div>
        )}

        {/* echo cues */}
        {line?.pass === "listen" && !inPause && (
          <Cue frame={lf} label="JUST LISTEN" icon={<Ear size={34} color={GOLD} />} />
        )}
        {repeatPause && (() => {
          const p = clampI(t, [line!.end, line!.pauseEnd], [0, 1], Easing.linear);
          const left = Math.max(1, Math.ceil(line!.pauseEnd - t));
          return <Cue frame={Math.round((t - line!.end) * fps)} label="YOUR TURN" icon={<Mic size={34} color={NIGHT} />} gold ring={p} count={left} />;
        })()}
        {cta > 0 && (
          <div style={{ position: "absolute", left: 0, right: 0, bottom: 34, display: "flex", justifyContent: "center", opacity: cta,
            transform: `translateY(${(1 - cta) * 20}px)` }}>
            <div style={{ padding: "16px 30px", borderRadius: 999, background: GOLD, color: NIGHT, fontFamily: HANKEN, fontWeight: 700, fontSize: 32 }}>
              ▶ {data.cta}
            </div>
          </div>
        )}
      </div>

      {/* captions — narrower than the frame so the Shorts action column never covers a word */}
      {line && (
        <div style={{ position: "absolute", left: 70, width: 850, top: 1392, textAlign: "center", opacity: capIn,
          transform: `translateY(${(1 - capIn) * 26}px)` }}>
          <div style={{ fontFamily: isPhrase ? NEWS : HANKEN, fontStyle: isPhrase ? "italic" : "normal", fontWeight: isPhrase ? 500 : 600,
            fontSize: size, lineHeight: 1.18, letterSpacing: isPhrase ? "-0.005em" : "0" }}>
            {line.words.map((w, i) => {
              const ws = Math.round((w.start - 0.06) * fps);
              const said = frame >= ws;
              const pop = said ? spring({ frame: frame - ws, fps, config: { damping: 14, stiffness: 220, mass: 0.6 } }) : 0;
              const speaking = t >= w.start - 0.06 && t < w.end + 0.08;
              return (
                <span key={i} style={{ display: "inline-block", marginRight: "0.26em",
                  color: speaking ? GOLD : said || inPause ? WHITE : "rgba(244,241,234,0.32)",
                  transform: `translateY(${said ? (1 - pop) * 10 : 10}px) scale(${speaking ? 1 + 0.06 * pop : 1})`,
                  textShadow: speaking ? "0 0 26px rgba(233,196,106,0.45)" : "0 4px 18px rgba(0,0,0,0.6)" }}>
                  {w.text}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};

const Cue: React.FC<{ frame: number; label: string; icon: React.ReactNode; gold?: boolean; ring?: number; count?: number }> =
  ({ frame, label, icon, gold, ring, count }) => {
    const { fps } = useVideoConfig();
    const s = spring({ frame, fps, config: { damping: 13, stiffness: 180 } });
    const R = 30, C = 2 * Math.PI * R;
    return (
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 36, display: "flex", justifyContent: "center",
        opacity: s, transform: `translateY(${(1 - s) * 24}px) scale(${0.92 + 0.08 * s})` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 30px 14px 18px", borderRadius: 999,
          background: gold ? GOLD : "rgba(10,14,18,0.78)", border: gold ? "none" : "1px solid rgba(233,196,106,0.55)" }}>
          {ring != null ? (
            <div style={{ position: "relative", width: 72, height: 72 }}>
              <svg width={72} height={72} style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}>
                <circle cx={36} cy={36} r={R} fill="none" stroke="rgba(10,14,18,0.25)" strokeWidth={6} />
                <circle cx={36} cy={36} r={R} fill="none" stroke={NIGHT} strokeWidth={6} strokeLinecap="round"
                  strokeDasharray={C} strokeDashoffset={C * (ring ?? 0)} />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: MONO, fontSize: 30, color: NIGHT }}>{count}</div>
            </div>
          ) : icon}
          {ring != null && icon}
          <span style={{ fontFamily: HANKEN, fontWeight: 700, fontSize: 34, letterSpacing: "0.12em", color: gold ? NIGHT : GOLD }}>{label}</span>
        </div>
      </div>
    );
  };
