// data-ep13.jsx — English Unlocked · Episode 13 "Polite Requests at Work"
// Season 2 — Real Conversations. Standard 6-phase shadowing format.
// English ONLY on screen. Timed by episode-engine.jsx.

const SECTIONS = {
  grounding:    { n: 1, label: "Grounding" },
  map:          { n: 2, label: "The Map" },
  listening:    { n: 3, label: "Listening" },
  articulation: { n: 4, label: "Articulation" },
  rhythm:       { n: 5, label: "Rhythm" },
  anchor:       { n: 6, label: "The Anchor" },
};
const PHASE_ORDER = ["grounding", "map", "listening", "articulation", "rhythm", "anchor"];

const LISTEN = [
  "When you get a chance, could you take a look?",
  "Could you give me a hand with this?",
  "I just wanted to check in on this…",
  "No rush, but I’d love your feedback…",
  "Let me know if anything’s unclear…",
];
const SLOW = [
  "When you get a chance… could you take a look?",
  "Could you… give me a hand with this?",
  "I just wanted… to check in on this.",
  "No rush… but I’d love your feedback.",
  "Let me know… if anything’s unclear.",
];
const NATURAL = [
  "When you get a chance, could you take a look?",
  "Could you give me a hand with this?",
  "I just wanted to check in on this.",
  "No rush, but I’d love your feedback.",
  "Let me know if anything’s unclear.",
];

const SCRIPT = [
  // 1 — Grounding
  { s: "grounding", t: "Welcome back to your calm practice." },
  { s: "grounding", t: "Breathe in, slowly…", breath: "in" },
  { s: "grounding", t: "And out…", breath: "out", p: 2 },
  { s: "grounding", t: "I am Betty. And this is English Unlocked.", betty: true, p: 1.5 },

  // 2 — The Map
  { s: "map", t: "Today, we practice polite requests at work." },
  { s: "map", t: "Asking for help can feel awkward, even rude.", p: 2 },
  { s: "map", t: "After this, you can make a request in a warm tone, and sound completely natural.", p: 2 },

  // 3 — Listening
  { s: "listening", t: "First, just listen." },
  { s: "listening", t: "Hear how gentle and unhurried each request is.", p: 3 },
  ...euPass("listening", LISTEN, "listen", 4),

  // 4 — Articulation
  { s: "articulation", t: "Now, it is your turn." },
  { s: "articulation", t: "Slowly. Keep your voice soft and friendly.", p: 3 },
  ...euPass("articulation", SLOW, "repeat", 6),

  // 5 — Rhythm
  { s: "rhythm", t: "Lovely. Now let it flow." },
  { s: "rhythm", t: "Natural speed, like a quick message to a friend.", p: 3 },
  ...euPass("rhythm", NATURAL, "repeat", 4),

  // 6 — The Anchor
  { s: "anchor", t: "Beautifully done.", p: 2 },
  { s: "anchor", t: "A kind request is easy to say yes to." },
  { s: "anchor", t: "You can be polite and clear at the same time.", p: 3 },
  { s: "anchor", t: "Slow English. Clear mind." },
  { s: "anchor", t: "This is English Unlocked." },
];

// English-to-English vocab cards — calm moments only, anchored to a narration line.
const VOCAB = [
  { word: "awkward", pos: "adjective", def: "Uncomfortable — not smooth or easy.", anchor: "feel awkward" },
  { word: "tone", pos: "noun", def: "The feeling your voice carries, under the words.", anchor: "a warm tone" },
  { word: "request", pos: "noun", def: "A polite way of asking for something.", anchor: "A kind request" },
];

window.EPISODE = buildEpisodeEU({
  epNumber: 13, title: "Polite Requests at Work",
  hook: "Ask for help at work — and sound completely natural.",
  sections: SECTIONS, phaseOrder: PHASE_ORDER,
  script: SCRIPT, vocab: VOCAB,
});
