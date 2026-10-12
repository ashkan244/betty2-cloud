// data-ep03.jsx — English Unlocked · Episode 03 "Handling Confusion"
// How to confidently say "I didn't understand" without embarrassment.
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
  "I’m sorry, I didn’t quite catch that.",
  "Could you say that one more time?",
  "Do you mind repeating that last part?",
  "I want to make sure I understand.",
  "Let me see if I got this right.",
];
const SLOW = [
  "I’m sorry… I didn’t quite catch that.",
  "Could you say that… one more time?",
  "Do you mind repeating… that last part?",
  "I want to make sure… I understand.",
  "Let me see… if I got this right.",
];
const NATURAL = [
  "I’m sorry, I didn’t quite catch that.",
  "Could you say that one more time?",
  "Do you mind repeating that last part?",
  "I want to make sure I understand.",
  "Let me see if I got this right.",
];

const SCRIPT = [
  // 1 — Grounding
  { s: "grounding", t: "Welcome to your shadowing practice." },
  { s: "grounding", t: "Take a slow, deep breath in…", breath: "in" },
  { s: "grounding", t: "And let it go.", breath: "out", p: 2 },
  { s: "grounding", t: "I am Betty. And this is English Unlocked.", betty: true, p: 1.5 },

  // 2 — The Map
  { s: "map", t: "Today, we are practicing how to Handle Confusion." },
  { s: "map", t: "When native speakers talk fast, it is normal to miss a word.", p: 2 },
  { s: "map", t: "After this, you can ask for clarity — without any shame.", p: 2 },

  // 3 — Listening
  { s: "listening", t: "Just listen." },
  { s: "listening", t: "Feel how polite and calm these phrases are.", p: 3 },
  ...euPass("listening", LISTEN, "listen", 4),

  // 4 — Slow Articulation
  { s: "articulation", t: "Let’s build the muscle memory." },
  { s: "articulation", t: "Speak slowly and clearly." },
  { s: "articulation", t: "Listen. And repeat.", p: 3 },
  ...euPass("articulation", SLOW, "repeat", 6),

  // 5 — Natural Rhythm
  { s: "rhythm", t: "Great job." },
  { s: "rhythm", t: "Now, let’s say them with natural flow." },
  { s: "rhythm", t: "Don’t apologize too much. Just politely ask.", p: 3 },
  ...euPass("rhythm", NATURAL, "repeat", 5),

  // 6 — The Anchor
  { s: "anchor", t: "Well done.", p: 2 },
  { s: "anchor", t: "Never feel embarrassed to say “I didn’t catch that.”" },
  { s: "anchor", t: "Even native speakers use these phrases every single day." },
  { s: "anchor", t: "Your understanding is more important than your speed.", p: 3 },
  { s: "anchor", t: "Slow English. Clear mind." },
  { s: "anchor", t: "This is English Unlocked." },
];

// English-to-English vocab cards — calm moments only, anchored to a narration line.
const VOCAB = [
  { word: "miss", pos: "verb", def: "To not hear or not catch something.", anchor: "to miss a word" },
  { word: "clarity", pos: "noun", def: "A clear understanding — no confusion left.", anchor: "ask for clarity" },
  { word: "embarrassed", pos: "adjective", def: "Feeling shy or uncomfortable about something.", anchor: "feel embarrassed" },
];

window.EPISODE = buildEpisodeEU({
  epNumber: 3, title: "Handling Confusion",
  hook: "Didn’t catch that? Five ways to ask — without any shame.",
  sections: SECTIONS, phaseOrder: PHASE_ORDER,
  script: SCRIPT, vocab: VOCAB,
});
