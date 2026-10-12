// data-ep05.jsx — English Unlocked · Episode 05 "Small Talk Openers"
// How to start a short conversation without stress.
// 6-phase slow shadowing. English ONLY on screen. Timed by episode-engine.jsx.

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
  "How has your day been so far?",
  "Are you having a busy week?",
  "It’s been a long week, hasn’t it?",
  "I love your coffee mug, where did you get it?",
  "Any exciting plans for the weekend?",
];
const SLOW = [
  "How has your day… been so far?",
  "Are you having… a busy week?",
  "It’s been a long week… hasn’t it?",
  "I love your coffee mug… where did you get it?",
  "Any exciting plans… for the weekend?",
];
const NATURAL = [
  "How has your day been so far?",
  "Are you having a busy week?",
  "It’s been a long week, hasn’t it?",
  "I love your coffee mug, where did you get it?",
  "Any exciting plans for the weekend?",
];

const SCRIPT = [
  // 1 — Grounding
  { s: "grounding", t: "Welcome to your shadowing practice." },
  { s: "grounding", t: "Breathe in slowly…", breath: "in" },
  { s: "grounding", t: "And breathe out.", breath: "out", p: 2 },
  { s: "grounding", t: "I am Betty. And this is English Unlocked.", betty: true, p: 1.5 },

  // 2 — The Map
  { s: "map", t: "Today, we are practicing Small Talk Openers." },
  { s: "map", t: "Starting a conversation is the hardest part for an overthinker.", p: 2 },
  { s: "map", t: "After this, you can open a conversation and connect, without rehearsing it first.", p: 2 },

  // 3 — Listening
  { s: "listening", t: "Close your eyes." },
  { s: "listening", t: "Listen to the warmth in these questions.", p: 3 },
  ...euPass("listening", LISTEN, "listen", 4),

  // 4 — Slow Articulation
  { s: "articulation", t: "Now, speak with me." },
  { s: "articulation", t: "Keep your voice light and friendly." },
  { s: "articulation", t: "Listen. And repeat.", p: 3 },
  ...euPass("articulation", SLOW, "repeat", 6),

  // 5 — Natural Rhythm
  { s: "rhythm", t: "Beautiful." },
  { s: "rhythm", t: "Now, the natural flow. Smile a little bit while you say them.", p: 3 },
  ...euPass("rhythm", NATURAL, "repeat", 5),

  // 6 — The Anchor
  { s: "anchor", t: "Well done.", p: 2 },
  { s: "anchor", t: "Remember, people love to be noticed. A simple, polite question is a gift you give to someone else." },
  { s: "anchor", t: "You don’t need to be loud to be friendly.", p: 3 },
  { s: "anchor", t: "Slow English. Clear mind." },
  { s: "anchor", t: "This is English Unlocked." },
];

// English-to-English vocab cards — calm moments only, anchored to a narration line.
const VOCAB = [
  { word: "overthinker", pos: "noun", def: "Someone who thinks about a moment far too much before acting.", anchor: "for an overthinker" },
  { word: "connect", pos: "verb", def: "To make a real link with another person.", anchor: "and connect" },
  { word: "noticed", pos: "verb", def: "Seen and paid attention to by someone.", anchor: "to be noticed" },
];

window.EPISODE = buildEpisodeEU({
  epNumber: 5, title: "Small Talk Openers",
  hook: "Start a conversation in English without rehearsing it first.",
  sections: SECTIONS, phaseOrder: PHASE_ORDER,
  script: SCRIPT, vocab: VOCAB,
});
