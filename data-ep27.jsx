// data-ep27.jsx — English Unlocked · Episode 27 "Talking About Your Work"
// Season 3 — Out in the World. Short-open build (see data-ep21.jsx header).
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
  "I work in marketing, mostly with data.",
  "It sounds complicated, but it’s quite simple.",
  "I’ve been doing it for four years.",
  "The best part is the people.",
  "What about you — what do you do?",
];
const SLOW = [
  "I work in marketing… mostly with data.",
  "It sounds complicated… but it’s quite simple.",
  "I’ve been doing it… for four years.",
  "The best part… is the people.",
  "What about you… what do you do?",
];
const NATURAL = [
  "I work in marketing, mostly with data.",
  "It sounds complicated, but it’s quite simple.",
  "I’ve been doing it for four years.",
  "The best part is the people.",
  "What about you — what do you do?",
];

const SCRIPT = [
  // 1 — Grounding
  { s: "grounding", t: "Welcome back. Let’s get your voice ready." },
  { s: "grounding", t: "Breathe in…", breath: "in" },
  { s: "grounding", t: "And out…", breath: "out", p: 2 },
  { s: "grounding", t: "I am Betty. And this is English Unlocked.", betty: true, p: 1.5 },

  // 2 — The Map
  { s: "map", t: "Today, we answer the question: what do you do?" },
  { s: "map", t: "It arrives in every conversation, and it freezes almost everyone.", p: 2 },
  { s: "map", t: "After this, you can answer in one clear line, and hand it back.", p: 2 },

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
  { s: "anchor", t: "Beautifully done.", p: 1.5 },
  { s: "anchor", t: "Now hear it as one real moment:" },
  { s: "anchor", t: "“So, what do you do?” — “I work in marketing, mostly with data.”", p: 2 },
  { s: "anchor", t: "Replace your job title with your own words.", p: 2 },
  { s: "anchor", t: "Slow English. Clear mind. This is English Unlocked." },
];

// English-to-English vocab cards — calm moments only, anchored to a narration line.
const VOCAB = [
  { word: "freeze",      pos: "verb", def: "To suddenly stop, unable to speak or move.",              anchor: "freezes almost everyone" },
  { word: "hand it back", pos: "phrase", def: "To return the question, so the other person speaks.",  anchor: "hand it back" },
  { word: "job title",   pos: "noun", def: "The official name of your role at work.",                 anchor: "your job title" },
];

window.EPISODE = buildEpisodeEU({
  epNumber: 27, title: "Talking About Your Work",
  hook: "“So, what do you do?” — answer it without freezing.",
  sections: SECTIONS, phaseOrder: PHASE_ORDER,
  script: SCRIPT, vocab: VOCAB,
});
