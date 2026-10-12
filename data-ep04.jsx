// data-ep04.jsx — English Unlocked · Episode 04 "Soft Boundaries"
// How to disagree or say no — politely, without tension.
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
  "I see your point, but…",
  "I have a slightly different perspective.",
  "I’m not so sure about that.",
  "That’s interesting, but I look at it differently.",
  "Let’s agree to disagree on this one.",
];
const SLOW = [
  "I see your point… but…",
  "I have a slightly… different perspective.",
  "I’m not so sure… about that.",
  "That’s interesting… but I look at it differently.",
  "Let’s agree to disagree… on this one.",
];
const NATURAL = [
  "I see your point, but…",
  "I have a slightly different perspective.",
  "I’m not so sure about that.",
  "That’s interesting, but I look at it differently.",
  "Let’s agree to disagree on this one.",
];

const SCRIPT = [
  // 1 — Grounding
  { s: "grounding", t: "Welcome to your shadowing practice." },
  { s: "grounding", t: "Inhale deeply…", breath: "in" },
  { s: "grounding", t: "And exhale completely.", breath: "out", p: 2 },
  { s: "grounding", t: "I am Betty. And this is English Unlocked.", betty: true, p: 1.5 },

  // 2 — The Map
  { s: "map", t: "Today, we are practicing Soft Boundaries." },
  { s: "map", t: "For overthinkers, disagreeing with someone in a second language feels dangerous.", p: 2 },
  { s: "map", t: "After this, you can disagree with grace, and keep the relationship warm.", p: 2 },

  // 3 — Listening
  { s: "listening", t: "Close your eyes." },
  { s: "listening", t: "Listen to how soft, yet confident, these boundaries are.", p: 3 },
  ...euPass("listening", LISTEN, "listen", 4),

  // 4 — Slow Articulation
  { s: "articulation", t: "Now, let’s practice saying them together." },
  { s: "articulation", t: "Keep your voice calm and steady." },
  { s: "articulation", t: "Listen. And repeat.", p: 3 },
  ...euPass("articulation", SLOW, "repeat", 6),

  // 5 — Natural Rhythm
  { s: "rhythm", t: "Excellent." },
  { s: "rhythm", t: "Now, the natural rhythm." },
  { s: "rhythm", t: "Imagine you are at work, calmly sharing your view.", p: 3 },
  ...euPass("rhythm", NATURAL, "repeat", 5),

  // 6 — The Anchor
  { s: "anchor", t: "You did a great job today.", p: 2 },
  { s: "anchor", t: "Having a different opinion does not break a connection." },
  { s: "anchor", t: "When you express it calmly, it actually builds respect." },
  { s: "anchor", t: "Your perspective is valuable. Let it be heard.", p: 3 },
  { s: "anchor", t: "Slow English. Clear mind." },
  { s: "anchor", t: "This is English Unlocked." },
];

// English-to-English vocab cards — calm moments only, anchored to a narration line.
const VOCAB = [
  { word: "disagree", pos: "verb", def: "To have a different opinion from someone.", anchor: "disagreeing with someone" },
  { word: "grace", pos: "noun", def: "Calm, kind control — even in a hard moment.", anchor: "disagree with grace" },
  { word: "connection", pos: "noun", def: "The warm link between two people.", anchor: "break a connection" },
];

window.EPISODE = buildEpisodeEU({
  epNumber: 4, title: "Soft Boundaries",
  hook: "Say no in English, and keep the friendship.",
  sections: SECTIONS, phaseOrder: PHASE_ORDER,
  script: SCRIPT, vocab: VOCAB,
});
