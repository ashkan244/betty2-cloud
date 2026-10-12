// data-ep34.jsx — English Unlocked · Episode 34 "Asking for a Favour"
// Season 4 — Closer to People. House format (see data-ep22.jsx): short open, 5 phrases,
// contextual exchange in the Anchor. English ONLY on screen. Timed by episode-engine.jsx.

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
  "Could you do me a small favour?",
  "Would you mind watching my bag?",
  "Only if it’s no trouble for you.",
  "Is there anything I can do for you?",
  "That would really help me, thank you.",
];
const SLOW = [
  "Could you do me… a small favour?",
  "Would you mind… watching my bag?",
  "Only if it’s… no trouble for you.",
  "Is there anything… I can do for you?",
  "That would really help me… thank you.",
];
const NATURAL = [
  "Could you do me a small favour?",
  "Would you mind watching my bag?",
  "Only if it’s no trouble for you.",
  "Is there anything I can do for you?",
  "That would really help me, thank you.",
];

const SCRIPT = [
  // 1 — Grounding
  { s: "grounding", t: "Welcome back. Let’s get your voice ready." },
  { s: "grounding", t: "Breathe in…", breath: "in" },
  { s: "grounding", t: "And out…", breath: "out", p: 2 },
  { s: "grounding", t: "I am Betty. And this is English Unlocked.", betty: true, p: 1.5 },

  // 2 — The Map
  { s: "map", t: "Today, we practice asking for a favour." },
  { s: "map", t: "Many of us would rather struggle alone than ask.", p: 2 },
  { s: "map", t: "After this, you can ask for help politely, and offer help back.", p: 2 },

  // 3 — Listening
  { s: "listening", t: "First, just listen." },
  ...euPass("listening", LISTEN, "listen", 3.5),

  // 4 — Articulation
  { s: "articulation", t: "Now it is your turn. Slowly, with a calm voice." },
  ...euPass("articulation", SLOW, "repeat", 6),

  // 5 — Rhythm
  { s: "rhythm", t: "Good. Now let it flow, at natural speed." },
  ...euPass("rhythm", NATURAL, "repeat", 4),

  // 6 — The Anchor
  { s: "anchor", t: "Very good.", p: 1.5 },
  { s: "anchor", t: "Now hear it as one real moment:" },
  { s: "anchor", t: "“Would you mind watching my bag?” — “Of course. Take your time.”", p: 2 },
  { s: "anchor", t: "Asking is not weakness. It lets people be kind.", p: 2 },
  { s: "anchor", t: "Slow English. Clear mind. This is English Unlocked." },
];

// English-to-English vocab cards — calm moments only, anchored to a narration line.
const VOCAB = [
  { word: "struggle", pos: "verb", def: "To try very hard to do something difficult.", anchor: "rather struggle alone" },
  { word: "offer", pos: "verb", def: "To say you are ready to give or do something.", anchor: "offer help back" },
  { word: "weakness", pos: "noun", def: "A lack of strength; something you are not good at.", anchor: "not weakness" },
];

window.EPISODE = buildEpisodeEU({
  epNumber: 34, title: "Asking for a Favour",
  hook: "Ask for help — without feeling like a burden.",
  sections: SECTIONS, phaseOrder: PHASE_ORDER,
  script: SCRIPT, vocab: VOCAB,
});
