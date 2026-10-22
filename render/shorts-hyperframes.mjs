// shorts-hyperframes.mjs — build the HyperFrames version of every short ("Kinetic Editorial" style).
//
//   node shorts-hyperframes.mjs            -> shorts/hyperframes/<id>/{index.html, clip.mp4, fonts/}
//   cd shorts/hyperframes/<id> && npx hyperframes render --output ../out/<id>.mp4
//
// Same input as the Remotion version (shorts/src/<id>/data.json + clip.mp4), different look:
//   footage    full-bleed square at the top, no rounding, a gold rule under it that fills with time
//   captions   each word slides up out of a mask the moment Betty says it; a gold marker
//              sweeps behind every target phrase once it has been said
//   cues       listen lines: "LISTEN" with five sound bars; repeat pauses: a gold "YOUR TURN"
//              band with big ticking countdown digits
//   cuts       a short zoom-blur whip; the end: a CTA chip
// HyperFrames rules kept: muted <video> + separate <audio>, one paused GSAP timeline registered
// on window.__timelines, deterministic (no random/time), local fonts.
import path from "node:path";
import { fileURLToPath } from "node:url";
import { copyFileSync, cpSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "shorts", "src");
const DEST = path.join(ROOT, "shorts", "hyperframes");
const ONLY = process.env.IDS ? process.env.IDS.split(",") : null;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const r3 = (x) => Math.round(x * 1000) / 1000;

for (const id of readdirSync(SRC).filter((d) => existsSync(path.join(SRC, d, "data.json")))) {
  if (ONLY && !ONLY.includes(id)) continue;
  const D = JSON.parse(readFileSync(path.join(SRC, id, "data.json"), "utf8"));
  const dir = path.join(DEST, id);
  mkdirSync(dir, { recursive: true });
  copyFileSync(path.join(SRC, id, "clip.mp4"), path.join(dir, "clip.mp4"));
  cpSync(path.join(DEST, "_fonts"), path.join(dir, "fonts"), { recursive: true });

  const lines = D.lines;
  const nextStart = (i) => (i + 1 < lines.length ? lines[i + 1].start : D.duration);
  const html = [], tw = [];
  lines.forEach((l, i) => {
    const big = l.phrase || l.hook || /^[“"]/.test(l.text);   // quoted dialogue reads as a phrase too
    const len = l.text.length;
    const fs = big ? (len > 44 ? 62 : len > 32 ? 70 : 80) : (len > 48 ? 46 : 52);
    const words = l.words.map((w, k) =>
      `<span class="w"><span class="wi" id="w${i}_${k}">${esc(w.text)}</span></span>`).join(" ");
    html.push(`<div class="cap ${big ? "big" : "small"}" id="cap${i}" style="font-size:${fs}px">
        <span class="txt" id="mark${i}">${words}</span></div>`);
    const a = Math.max(0.05, l.start - 0.15), b = nextStart(i) - 0.1;
    tw.push(`tl.fromTo("#cap${i}", { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.32, ease: "power3.out" }, ${r3(a)});`);
    if (i < lines.length - 1) tw.push(`tl.to("#cap${i}", { opacity: 0, y: -18, duration: 0.22, ease: "power2.in" }, ${r3(b)});`);
    // words rise out of their mask as they are spoken
    l.words.forEach((w, k) => {
      tw.push(`tl.fromTo("#w${i}_${k}", { yPercent: 105 }, { yPercent: 0, duration: 0.28, ease: "${k % 3 === 0 ? "expo.out" : k % 3 === 1 ? "power4.out" : "back.out(1.6)"}" }, ${r3(Math.max(a, w.start - 0.08))});`);
      tw.push(`tl.fromTo("#w${i}_${k}", { color: "#e9c46a" }, { color: "#f4f1ea", duration: 0.35, ease: "power1.out" }, ${r3(w.end)});`);
    });
    // the marker sweeps behind a target phrase once it has been said
    if (l.phrase) tw.push(`tl.fromTo("#mark${i}", { backgroundSize: "0% 30%" }, { backgroundSize: "100% 30%", duration: 0.55, ease: "power2.out" }, ${r3(l.end + 0.05)});`);
    // echo cues
    if (l.pass === "listen") {
      tw.push(`tl.fromTo("#listen", { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, ${r3(a)});`);
      tw.push(`tl.to("#listen", { opacity: 0, duration: 0.25 }, ${r3(Math.min(b, l.pauseEnd) - 0.05)});`);
      // the bars pulse on every word onset — deterministic, keyed to her voice
      l.words.forEach((w, k) => [0, 1, 2, 3, 4].forEach((j) => {
        const h = 0.35 + ((k * 7 + j * 3) % 10) / 14;
        tw.push(`tl.fromTo("#bar${j}", { scaleY: 0.25 }, { scaleY: ${r3(h)}, duration: 0.12, yoyo: true, repeat: 1, ease: "sine.inOut" }, ${r3(w.start + j * 0.02)});`);
      }));
    }
    if (l.pass === "repeat" && l.pauseEnd - l.end > 0.6) {
      const p0 = l.end + 0.05, p1 = l.pauseEnd - 0.05, n = Math.max(1, Math.round(p1 - p0));
      tw.push(`tl.fromTo("#turn", { xPercent: -104 }, { xPercent: 0, duration: 0.42, ease: "expo.out" }, ${r3(p0)});`);
      tw.push(`tl.fromTo("#turnfill", { scaleX: 0 }, { scaleX: 1, duration: ${r3(p1 - p0)}, ease: "none" }, ${r3(p0)});`);
      for (let s = 0; s < n; s++) {
        const at = p0 + s * ((p1 - p0) / n);
        tw.push(`tl.set("#count", { textContent: "${n - s}" }, ${r3(at)});`);
        tw.push(`tl.fromTo("#count", { scale: 1.35, opacity: 0.4 }, { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(2)" }, ${r3(at)});`);
      }
      tw.push(`tl.to("#turn", { xPercent: 104, duration: 0.3, ease: "power2.in" }, ${r3(p1 - 0.25)});`);
      tw.push(`tl.fromTo("#cam", { scale: 1.0 }, { scale: 1.035, duration: ${r3(p1 - p0)}, ease: "sine.inOut", immediateRender: false }, ${r3(p0)});`);
    }
    if (l.phrase && D.phrases > 1)
      tw.push(`tl.set("#ctr", { textContent: "${String(l.n).padStart(2, "0")} / ${String(D.phrases).padStart(2, "0")}" }, ${r3(a)});`,
        `tl.fromTo("#ctr", { opacity: 0, x: -14 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out" }, ${r3(a)});`);
  });
  // cuts: a short zoom-blur whip (immediateRender:false — a fromTo otherwise applies its blur from frame 0)
  for (const c of D.cuts) tw.push(`tl.fromTo("#camwrap", { scale: 1.09, filter: "blur(10px)" }, { scale: 1, filter: "blur(0px)", duration: 0.38, ease: "expo.out", immediateRender: false }, ${r3(c)});`);
  const ctaAt = D.duration - 2.4;

  const page = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=1080, height=1920" />
<title>${esc(D.headline)} — English Unlocked</title>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
<style>
  @font-face { font-family: "Newsreader"; font-style: italic; font-weight: 400; src: url("fonts/newsreader-latin-400-italic.woff2") format("woff2"); }
  @font-face { font-family: "Newsreader"; font-style: italic; font-weight: 500; src: url("fonts/newsreader-latin-500-italic.woff2") format("woff2"); }
  @font-face { font-family: "Hanken Grotesk"; font-weight: 500; src: url("fonts/hanken-grotesk-latin-500-normal.woff2") format("woff2"); }
  @font-face { font-family: "Hanken Grotesk"; font-weight: 600; src: url("fonts/hanken-grotesk-latin-600-normal.woff2") format("woff2"); }
  @font-face { font-family: "Hanken Grotesk"; font-weight: 700; src: url("fonts/hanken-grotesk-latin-700-normal.woff2") format("woff2"); }
  @font-face { font-family: "JetBrains Mono"; font-weight: 500; src: url("fonts/jetbrains-mono-latin-500-normal.woff2") format("woff2"); }
  body { margin: 0; background: #0a0e12; }
  #root { position: relative; width: 1080px; height: 1920px; overflow: hidden; background: #0a0e12; color: #f4f1ea; }
  .glow { position: absolute; left: -200px; right: -200px; top: 1000px; height: 900px;
    background: radial-gradient(50% 45% at 50% 40%, rgba(233,196,106,0.10), transparent 70%); }
  #camwrap { position: absolute; left: 0; top: 96px; width: 1080px; height: 1080px; overflow: hidden; }
  #cam { position: absolute; inset: 0; transform-origin: 50% 34%; }
  #cam video { width: 100%; height: 100%; object-fit: cover; display: block; }
  .shade { position: absolute; left: 0; right: 0; bottom: 0; height: 300px; background: radial-gradient(120% 100% at 50% 100%, rgba(10,14,18,0.95), transparent 70%); }
  .rule { position: absolute; left: 0; top: 1176px; width: 1080px; height: 4px; background: rgba(244,241,234,0.10); }
  #rulefill { position: absolute; left: 0; top: 0; width: 100%; height: 100%; background: #e9c46a; transform-origin: left center; transform: scaleX(0); }
  .brand { position: absolute; left: 44px; top: 128px; font-family: "JetBrains Mono", monospace; font-weight: 500; font-size: 24px;
    letter-spacing: 0.22em; color: #e9c46a; padding: 10px 18px; background: rgba(10,14,18,0.62); border-radius: 6px; }
  #ctr { position: absolute; right: 44px; top: 128px; font-family: "JetBrains Mono", monospace; font-size: 26px; letter-spacing: 0.14em;
    color: #0a0e12; background: #e9c46a; padding: 10px 18px; border-radius: 6px; opacity: 0; }
  .head { position: absolute; left: 70px; right: 70px; top: 1214px; font-family: "Hanken Grotesk", sans-serif; font-weight: 700;
    font-size: 30px; letter-spacing: 0.16em; text-transform: uppercase; color: #e9c46a; }
  .caps { position: absolute; left: 70px; width: 860px; top: 1282px; height: 360px; }
  .cap { position: absolute; left: 0; right: 0; top: 0; line-height: 1.16; opacity: 0; }
  .cap.big { font-family: "Newsreader", serif; font-style: italic; font-weight: 500; }
  .cap.small { font-family: "Hanken Grotesk", sans-serif; font-weight: 600; color: #f4f1ea; }
  .txt { background-image: linear-gradient(rgba(233,196,106,0.34), rgba(233,196,106,0.34)); background-repeat: no-repeat;
    background-size: 0% 30%; background-position: 0 86%; -webkit-box-decoration-break: clone; box-decoration-break: clone; }
  .w { display: inline-block; overflow: hidden; vertical-align: bottom; padding: 0 0.04em 0.12em; margin-bottom: -0.12em; }
  .wi { display: inline-block; }
  #listen { position: absolute; left: 70px; top: 1666px; display: flex; align-items: center; gap: 18px; opacity: 0;
    font-family: "Hanken Grotesk", sans-serif; font-weight: 700; font-size: 28px; letter-spacing: 0.2em; color: #e9c46a; }
  .bars { display: flex; align-items: center; gap: 6px; height: 40px; }
  .bars i { display: block; width: 7px; height: 40px; border-radius: 4px; background: #e9c46a; transform: scaleY(0.25); }
  #turn { position: absolute; left: 0; top: 1652px; height: 92px; width: 760px; background: #e9c46a; color: #0a0e12;
    display: flex; align-items: center; gap: 22px; padding: 0 30px 0 70px; box-sizing: border-box;
    font-family: "Hanken Grotesk", sans-serif; font-weight: 700; font-size: 38px; letter-spacing: 0.14em; overflow: hidden; }
  #turnfill { position: absolute; left: 0; bottom: 0; height: 6px; width: 100%; background: #0a0e12; opacity: 0.35; transform-origin: left; transform: scaleX(0); }
  #count { font-family: "JetBrains Mono", monospace; font-size: 54px; letter-spacing: 0; min-width: 44px; text-align: center; }
  #cta { position: absolute; left: 70px; top: 1666px; padding: 18px 30px; border-radius: 999px; border: 2px solid #e9c46a; opacity: 0;
    font-family: "Hanken Grotesk", sans-serif; font-weight: 700; font-size: 32px; color: #f4f1ea; background: rgba(10,14,18,0.8); }
</style>
</head>
<body>
<div id="root" data-composition-id="main" data-width="1080" data-height="1920" data-duration="${r3(D.duration)}">
  <div class="glow"></div>
  <div id="camwrap"><div id="cam">
    <video id="v" class="clip" src="clip.mp4" data-start="0" data-duration="${r3(D.duration)}" data-track-index="0" muted playsinline></video>
  </div><div class="shade"></div></div>
  <audio id="a" src="clip.mp4" data-start="0" data-duration="${r3(D.duration)}" data-track-index="1" data-volume="1"></audio>
  <div class="rule"><div id="rulefill"></div></div>
  <div class="brand" id="brand">ENGLISH UNLOCKED · EP ${D.episode}</div>
  <div id="ctr"></div>
  <div class="head" id="head">${esc(D.headline)}</div>
  <div class="caps">
    ${html.join("\n    ")}
  </div>
  <div id="listen"><div class="bars"><i id="bar0"></i><i id="bar1"></i><i id="bar2"></i><i id="bar3"></i><i id="bar4"></i></div>LISTEN</div>
  <div id="turn"><span id="count">5</span><span>YOUR TURN — SAY IT</span><span id="turnfill"></span></div>
  <div id="cta">▶ ${esc(D.cta)}</div>
</div>
<script>
  window.__timelines = window.__timelines || {};
  const tl = gsap.timeline({ paused: true });
  tl.fromTo("#brand", { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, 0.1);
  tl.fromTo("#head", { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.55, ease: "expo.out" }, 0.2);
  tl.fromTo("#camwrap", { opacity: 0 }, { opacity: 1, duration: 0.35, ease: "power1.out" }, 0.05);
  tl.set("#turn", { xPercent: -104 }, 0);   // GSAP owns this transform from the first frame (a CSS translate would stack)
  tl.fromTo("#rulefill", { scaleX: 0 }, { scaleX: 1, duration: ${r3(D.duration)}, ease: "none" }, 0);
  ${tw.join("\n  ")}
  tl.fromTo("#cta", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.45, ease: "back.out(1.4)" }, ${r3(ctaAt)});
  window.__timelines["main"] = tl;
</script>
</body>
</html>
`;
  writeFileSync(path.join(dir, "index.html"), page, "utf8");
  console.log(`✓ ${id}: ${lines.length} lines, ${tw.length} tweens → shorts/hyperframes/${id}/index.html`);
}
