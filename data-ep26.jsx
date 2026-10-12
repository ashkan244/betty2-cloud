// data-ep26.jsx — English Unlocked · Episode 26 "Meeting New People"
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
  "Hi, I don’t think we’ve met.",
  "How do you know everyone here?",
  "That sounds like such an interesting job.",
  "I’d love to hear more about that.",
  "It was really nice meeting you.",
];
const SLOW = [
  "Hi… I don’t think we’ve met.",
  "How do you know… everyone here?",
  "That sounds like… such an interesting job.",
  "I’d love to hear… more about that.",
  "It was really nice… meeting you.",
];
const NATURAL = [
  "Hi, I don’t think we’ve met.",
  "How do you know everyone here?",
  "That sounds like such an interesting job.",
  "I’d love to hear more about that.",
  "It was really nice meeting you.",
];

const SCRIPT = [
  // 1 — Grounding
  { s: "grounding", t: "Welcome back. Let’s get your voice ready." },
  { s: "grounding", t: "Breathe in…", breath: "in" },
  { s: "grounding", t: "And out…", breath: "out", p: 2 },
  { s: "grounding", t: "I am Betty. And this is English Unlocked.", betty: true, p: 1.5 },

  // 2 — The Map
  { s: "map", t: "Today, we practice meeting new people." },
  { s: "map", t: "A room full of strangers is not a test. It is an invitation.", p: 2 },
  { s: "map", t: "After this, you can introduce yourself and leave a warm impression.", p: 2 },

  // 3 — Listening
  { s: "listening", t: "First, just listen." },
  ...euPass("listening", LISTEN, "listen", 3.5),

  // 4 — Articulation
  { s: "articulation", t: "Now it is your turn. Slowly, with a warm voice." },
  ...euPass("articulation", SLOW, "repeat", 6),

  // 5 — Rhythm
  { s: "rhythm", t: "Good. Now let it flow, at natural speed." },
  ...euPass("rhythm", NATURAL, "repeat", 4),

  // 6 — The Anchor
  { s: "anchor", t: "Beautifully done.", p: 1.5 },
  { s: "anchor", t: "Now hear it as one real moment:" },
  { s: "anchor", t: "“Hi, I don’t think we’ve met.” — “No, we haven’t! I’m Sam.”", p: 2 },
  { s: "anchor", t: "Every friendship you have started with one sentence.", p: 2 },
  { s: "anchor", t: "Slow English. Clear mind. This is English Unlocked." },
];

// English-to-English vocab cards — calm moments only, anchored to a narration line.
const VOCAB = [
  { word: "introduce",  pos: "verb", def: "To tell someone your name so you can begin talking.", anchor: "introduce yourself" },
  { word: "meet",       pos: "verb", def: "To see and speak with someone for the first time.",   anchor: "meeting new people" },
  { word: "invitation", pos: "noun", def: "An offer to join something — not a test to pass.",    anchor: "It is an invitation" },
];

window.EPISODE = buildEpisodeEU({
  epNumber: 26, title: "Meeting New People",
  hook: "Walk into a room of strangers — and leave with a friend.",
  sections: SECTIONS, phaseOrder: PHASE_ORDER,
  script: SCRIPT, vocab: VOCAB,
});
