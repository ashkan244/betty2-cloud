// data-ep06.jsx — English Unlocked · Episode 06 "Buying Time to Think"
// Natural fillers for thinking — without awkward silence.
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
  "Well, let me think about that…",
  "That’s a really good question…",
  "To be completely honest with you…",
  "Actually, now that I think about it…",
  "Give me just a second to gather my thoughts…",
];
const SLOW = [
  "Well… let me think about that…",
  "That’s a really… good question…",
  "To be completely honest… with you…",
  "Actually… now that I think about it…",
  "Give me just a second… to gather my thoughts…",
];
const NATURAL = [
  "Well, let me think about that…",
  "That’s a really good question…",
  "To be completely honest with you…",
  "Actually, now that I think about it…",
  "Give me just a second to gather my thoughts…",
];

const SCRIPT = [
  // 1 — Grounding
  { s: "grounding", t: "Welcome back to your practice." },
  { s: "grounding", t: "Take a slow, deep breath in…", breath: "in" },
  { s: "grounding", t: "And let it out.", breath: "out", p: 2 },
  { s: "grounding", t: "I am Betty. And this is English Unlocked.", betty: true, p: 1.5 },

  // 2 — The Map
  { s: "map", t: "Today, we are practicing Buying Time to Think." },
  { s: "map", t: "When someone asks you a question, you might feel a rush of panic to answer immediately.", p: 2 },
  { s: "map", t: "After this, you can fill the silence, pause, and answer calmly.", p: 2 },

  // 3 — Listening
  { s: "listening", t: "Just listen." },
  { s: "listening", t: "Feel how these phrases slow down the conversation.", p: 3 },
  ...euPass("listening", LISTEN, "listen", 4),

  // 4 — Slow Articulation
  { s: "articulation", t: "Now, practice with me." },
  { s: "articulation", t: "Stretch the words. Take your time." },
  { s: "articulation", t: "Listen. And repeat.", p: 3 },
  ...euPass("articulation", SLOW, "repeat", 6),

  // 5 — Natural Rhythm
  { s: "rhythm", t: "Great." },
  { s: "rhythm", t: "Now, let’s say them with the natural rhythm of thinking.", p: 3 },
  ...euPass("rhythm", NATURAL, "repeat", 5),

  // 6 — The Anchor
  { s: "anchor", t: "You did perfectly.", p: 2 },
  { s: "anchor", t: "Never rush your mind." },
  { s: "anchor", t: "You are allowed to pause. You are allowed to think." },
  { s: "anchor", t: "Your thoughts are worth waiting for.", p: 3 },
  { s: "anchor", t: "Slow English. Clear mind." },
  { s: "anchor", t: "This is English Unlocked." },
];

// English-to-English vocab cards — calm moments only, anchored to a narration line.
const VOCAB = [
  { word: "rush", pos: "noun", def: "A sudden fast feeling that pushes you to hurry.", anchor: "a rush of panic" },
  { word: "silence", pos: "noun", def: "A moment with no words — it is allowed.", anchor: "fill the silence" },
  { word: "allowed", pos: "verb", def: "Having permission — nobody is stopping you.", anchor: "are allowed to pause" },
];

window.EPISODE = buildEpisodeEU({
  epNumber: 6, title: "Buying Time to Think",
  hook: "Buy yourself time to think — in natural English.",
  sections: SECTIONS, phaseOrder: PHASE_ORDER,
  script: SCRIPT, vocab: VOCAB,
});
