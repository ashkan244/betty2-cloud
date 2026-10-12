// data-ep38.jsx — English Unlocked · Episode 38 "At the Hotel"
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
  "Hi, I have a booking under Jones.",
  "Could I have a quiet room, please?",
  "What time is breakfast served?",
  "The air conditioning in my room isn’t working.",
  "Thank you, that’s everything I need.",
];
const SLOW = [
  "Hi… I have a booking under Jones.",
  "Could I have… a quiet room, please?",
  "What time… is breakfast served?",
  "The air conditioning in my room… isn’t working.",
  "Thank you… that’s everything I need.",
];
const NATURAL = [
  "Hi, I have a booking under Jones.",
  "Could I have a quiet room, please?",
  "What time is breakfast served?",
  "The air conditioning in my room isn’t working.",
  "Thank you, that’s everything I need.",
];

const SCRIPT = [
  // 1 — Grounding
  { s: "grounding", t: "Welcome back. Let’s get your voice ready." },
  { s: "grounding", t: "Breathe in…", breath: "in" },
  { s: "grounding", t: "And out…", breath: "out", p: 2 },
  { s: "grounding", t: "I am Betty. And this is English Unlocked.", betty: true, p: 1.5 },

  // 2 — The Map
  { s: "map", t: "Today, we practice talking at a hotel." },
  { s: "map", t: "Tired after travel, even simple questions feel heavy.", p: 2 },
  { s: "map", t: "After this, you can check in smoothly and report a problem politely.", p: 2 },

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
  { s: "anchor", t: "That was calm and clear.", p: 1.5 },
  { s: "anchor", t: "Now hear it as one real moment:" },
  { s: "anchor", t: "“The air conditioning in my room isn’t working.” — “I’m so sorry. I’ll send someone up now.”", p: 2 },
  { s: "anchor", t: "A calm request gets faster help than an angry one.", p: 2 },
  { s: "anchor", t: "Slow English. Clear mind. This is English Unlocked." },
];

// English-to-English vocab cards — calm moments only, anchored to a narration line.
const VOCAB = [
  { word: "heavy", pos: "adjective", def: "Hard to carry — tiring or difficult.", anchor: "feel heavy" },
  { word: "smoothly", pos: "adverb", def: "Easily, without problems or stops.", anchor: "check in smoothly" },
  { word: "request", pos: "noun", def: "A polite way of asking for something.", anchor: "A calm request" },
];

window.EPISODE = buildEpisodeEU({
  epNumber: 38, title: "At the Hotel",
  hook: "Check in, ask, and fix problems — calmly, at any hotel.",
  sections: SECTIONS, phaseOrder: PHASE_ORDER,
  script: SCRIPT, vocab: VOCAB,
});
