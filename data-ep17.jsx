// data-ep17.jsx — English Unlocked · Episode 17 "Travel & the Airport"
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
  "Excuse me, where’s the gate?",
  "I’d like to check in, please…",
  "Is this the right line?",
  "Could you point me the way?",
  "How do I get to downtown?",
];
const SLOW = [
  "Excuse me… where’s the gate?",
  "I’d like… to check in, please.",
  "Is this… the right line?",
  "Could you… point me the way?",
  "How do I… get to downtown?",
];
const NATURAL = [
  "Excuse me, where’s the gate?",
  "I’d like to check in, please.",
  "Is this the right line?",
  "Could you point me the way?",
  "How do I get to downtown?",
];

const SCRIPT = [
  // 1 — Grounding
  { s: "grounding", t: "Welcome back. Travel can be stressful — let’s soften it." },
  { s: "grounding", t: "Breathe in…", breath: "in" },
  { s: "grounding", t: "And out…", breath: "out", p: 2 },
  { s: "grounding", t: "I am Betty. And this is English Unlocked.", betty: true, p: 1.5 },

  // 2 — The Map
  { s: "map", t: "Today, we practice English for travel and the airport." },
  { s: "map", t: "In a new place, even a simple question feels heavy.", p: 2 },
  { s: "map", t: "After this, you can ask for directions and find your way through any airport.", p: 2 },

  // 3 — Listening
  { s: "listening", t: "First, just listen." },
  { s: "listening", t: "Hear how each question starts soft and polite.", p: 3 },
  ...euPass("listening", LISTEN, "listen", 4),

  // 4 — Articulation
  { s: "articulation", t: "Now, it is your turn." },
  { s: "articulation", t: "Slowly. A calm voice is easy to understand.", p: 3 },
  ...euPass("articulation", SLOW, "repeat", 6),

  // 5 — Rhythm
  { s: "rhythm", t: "Good. Now let it flow." },
  { s: "rhythm", t: "Natural speed, like a confident traveler.", p: 3 },
  ...euPass("rhythm", NATURAL, "repeat", 4),

  // 6 — The Anchor
  { s: "anchor", t: "Wonderful.", p: 2 },
  { s: "anchor", t: "Excuse me and please make any stranger want to help." },
  { s: "anchor", t: "The world is easier to cross than it looks.", p: 3 },
  { s: "anchor", t: "Slow English. Clear mind." },
  { s: "anchor", t: "This is English Unlocked." },
];

// English-to-English vocab cards — calm moments only, anchored to a narration line.
const VOCAB = [
  { word: "heavy", pos: "adjective", def: "Hard to carry — here, hard to say.", anchor: "feels heavy" },
  { word: "directions", pos: "noun", def: "Instructions telling you how to get somewhere.", anchor: "ask for directions" },
  { word: "stranger", pos: "noun", def: "A person you have never met before.", anchor: "any stranger" },
];

window.EPISODE = buildEpisodeEU({
  epNumber: 17, title: "Travel & the Airport",
  hook: "Travel and the airport in English — ask for what you need.",
  sections: SECTIONS, phaseOrder: PHASE_ORDER,
  script: SCRIPT, vocab: VOCAB,
});
