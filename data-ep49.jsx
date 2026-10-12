// data-ep49.jsx — English Unlocked · Episode 49 "Saying Goodbye"
// Season 5 — Getting Things Done. House format (see data-ep22.jsx): short open, 5 phrases,
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
  "It was really lovely to meet you.",
  "Let’s keep in touch, okay?",
  "Could I get your number or email?",
  "Send me a message when you arrive.",
  "Take care, and see you soon.",
];
const SLOW = [
  "It was really lovely… to meet you.",
  "Let’s keep in touch… okay?",
  "Could I get your number… or email?",
  "Send me a message… when you arrive.",
  "Take care… and see you soon.",
];
const NATURAL = [
  "It was really lovely to meet you.",
  "Let’s keep in touch, okay?",
  "Could I get your number or email?",
  "Send me a message when you arrive.",
  "Take care, and see you soon.",
];

const SCRIPT = [
  // 1 — Grounding
  { s: "grounding", t: "Welcome back. Let’s get your voice ready." },
  { s: "grounding", t: "Breathe in…", breath: "in" },
  { s: "grounding", t: "And out…", breath: "out", p: 2 },
  { s: "grounding", t: "I am Betty. And this is English Unlocked.", betty: true, p: 1.5 },

  // 2 — The Map
  { s: "map", t: "Today, we practice saying goodbye." },
  { s: "map", t: "Many good connections end at the door, because no one asks.", p: 2 },
  { s: "map", t: "After this, you can say goodbye warmly, and make sure it is not the end.", p: 2 },

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
  { s: "anchor", t: "“I have to go. My train leaves soon.” — “It was really lovely to meet you.”", p: 2 },
  { s: "anchor", t: "A goodbye can be the start of a friendship.", p: 2 },
  { s: "anchor", t: "Slow English. Clear mind. This is English Unlocked." },
];

// English-to-English vocab cards — calm moments only, anchored to a narration line.
const VOCAB = [
  { word: "connection", pos: "noun", def: "A relationship between people who know each other.", anchor: "good connections end" },
  { word: "warmly", pos: "adverb", def: "In a friendly, kind way.", anchor: "say goodbye warmly" },
  { word: "friendship", pos: "noun", def: "A relationship between friends.", anchor: "start of a friendship" },
];

window.EPISODE = buildEpisodeEU({
  epNumber: 49, title: "Saying Goodbye",
  hook: "Say goodbye in English — and keep the door open.",
  sections: SECTIONS, phaseOrder: PHASE_ORDER,
  script: SCRIPT, vocab: VOCAB,
});
