// data-ep09.jsx — English Unlocked · Episode 09 "Graceful Exits"
// How to end a conversation gently and calmly.
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
  "Anyway, I won’t keep you any longer.",
  "It was so nice catching up with you.",
  "I’d better get going, but let’s talk soon.",
  "I have to run to a meeting, but take care!",
  "Have a great rest of your day.",
];
const SLOW = [
  "Anyway… I won’t keep you any longer.",
  "It was so nice… catching up with you.",
  "I’d better get going… but let’s talk soon.",
  "I have to run to a meeting… but take care!",
  "Have a great… rest of your day.",
];
const NATURAL = [
  "Anyway, I won’t keep you any longer.",
  "It was so nice catching up with you.",
  "I’d better get going, but let’s talk soon.",
  "I have to run to a meeting, but take care!",
  "Have a great rest of your day.",
];

const SCRIPT = [
  // 1 — Grounding
  { s: "grounding", t: "Welcome to your practice." },
  { s: "grounding", t: "Let’s take a breath together. Inhale…", breath: "in" },
  { s: "grounding", t: "And exhale.", breath: "out", p: 2 },
  { s: "grounding", t: "I am Betty. And this is English Unlocked.", betty: true, p: 1.5 },

  // 2 — The Map
  { s: "map", t: "Today, we are practicing Graceful Exits." },
  { s: "map", t: "Introverts sometimes get trapped in long conversations because they don’t know how to leave politely.", p: 2 },
  { s: "map", t: "After this, you can protect your energy and leave warmly, at any moment.", p: 2 },

  // 3 — Listening
  { s: "listening", t: "Just listen." },
  { s: "listening", t: "Notice how friendly these exits sound.", p: 3 },
  ...euPass("listening", LISTEN, "listen", 4),

  // 4 — Slow Articulation
  { s: "articulation", t: "Now, practice with me." },
  { s: "articulation", t: "Listen. And repeat.", p: 3 },
  ...euPass("articulation", SLOW, "repeat", 6),

  // 5 — Natural Rhythm
  { s: "rhythm", t: "Great." },
  { s: "rhythm", t: "Now, the natural flow. Imagine you are smiling and waving goodbye.", p: 3 },
  ...euPass("rhythm", NATURAL, "repeat", 5),

  // 6 — The Anchor
  { s: "anchor", t: "Beautifully done.", p: 2 },
  { s: "anchor", t: "Protecting your energy is not rude. It is necessary." },
  { s: "anchor", t: "You can leave a conversation and still be loved and respected.", p: 3 },
  { s: "anchor", t: "Slow English. Clear mind." },
  { s: "anchor", t: "This is English Unlocked." },
];

// English-to-English vocab cards — calm moments only, anchored to a narration line.
const VOCAB = [
  { word: "trapped", pos: "adjective", def: "Stuck somewhere you cannot easily leave.", anchor: "get trapped" },
  { word: "protect", pos: "verb", def: "To keep something safe from harm.", anchor: "protect your energy" },
  { word: "necessary", pos: "adjective", def: "Needed — not optional.", anchor: "It is necessary" },
];

window.EPISODE = buildEpisodeEU({
  epNumber: 9, title: "Graceful Exits",
  hook: "Leave any conversation warmly — five graceful exits.",
  sections: SECTIONS, phaseOrder: PHASE_ORDER,
  script: SCRIPT, vocab: VOCAB,
});
