// data-ep47.jsx — English Unlocked · Episode 47 "Asking for Recommendations"
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
  "Do you know a good place to eat?",
  "What would you recommend around here?",
  "Is it far from here on foot?",
  "Is it better to book a table first?",
  "Thanks, I’ll definitely check it out.",
];
const SLOW = [
  "Do you know… a good place to eat?",
  "What would you recommend… around here?",
  "Is it far from here… on foot?",
  "Is it better… to book a table first?",
  "Thanks… I’ll definitely check it out.",
];
const NATURAL = [
  "Do you know a good place to eat?",
  "What would you recommend around here?",
  "Is it far from here on foot?",
  "Is it better to book a table first?",
  "Thanks, I’ll definitely check it out.",
];

const SCRIPT = [
  // 1 — Grounding
  { s: "grounding", t: "Welcome back. Let’s get your voice ready." },
  { s: "grounding", t: "Breathe in…", breath: "in" },
  { s: "grounding", t: "And out…", breath: "out", p: 2 },
  { s: "grounding", t: "I am Betty. And this is English Unlocked.", betty: true, p: 1.5 },

  // 2 — The Map
  { s: "map", t: "Today, we practice asking for recommendations." },
  { s: "map", t: "Guidebooks get old. Local people know what is good right now.", p: 2 },
  { s: "map", t: "After this, you can ask for advice, and follow up with good questions.", p: 2 },

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
  { s: "anchor", t: "Lovely work.", p: 1.5 },
  { s: "anchor", t: "Now hear it as one real moment:" },
  { s: "anchor", t: "“What would you recommend around here?” — “Try the little café by the bridge. It’s lovely.”", p: 2 },
  { s: "anchor", t: "One good question can turn a stranger into a guide.", p: 2 },
  { s: "anchor", t: "Slow English. Clear mind. This is English Unlocked." },
];

// English-to-English vocab cards — calm moments only, anchored to a narration line.
const VOCAB = [
  { word: "local", pos: "adjective", def: "From, or living in, a particular place.", anchor: "Local people know" },
  { word: "follow up", pos: "phrasal verb", def: "To ask more about something you just heard.", anchor: "follow up with good" },
  { word: "guide", pos: "noun", def: "A person who shows you the way.", anchor: "into a guide" },
];

window.EPISODE = buildEpisodeEU({
  epNumber: 47, title: "Asking for Recommendations",
  hook: "Ask locals for the best places — and get real answers.",
  sections: SECTIONS, phaseOrder: PHASE_ORDER,
  script: SCRIPT, vocab: VOCAB,
});
