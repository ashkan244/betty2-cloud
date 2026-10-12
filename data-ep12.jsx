// data-ep12.jsx — English Unlocked · Episode 12 "The Job Interview"
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
  "Thank you for having me…",
  "That’s a great question…",
  "Let me walk you through my experience…",
  "What would a typical day look like?",
  "I’m really excited about this opportunity…",
];
const SLOW = [
  "Thank you… for having me.",
  "That’s… a great question.",
  "Let me walk you through… my experience.",
  "What would… a typical day look like?",
  "I’m really excited… about this opportunity.",
];
const NATURAL = [
  "Thank you for having me.",
  "That’s a great question.",
  "Let me walk you through my experience.",
  "What would a typical day look like?",
  "I’m really excited about this opportunity.",
];

const SCRIPT = [
  // 1 — Grounding
  { s: "grounding", t: "Welcome back. Let’s get ready together." },
  { s: "grounding", t: "Take a slow breath in…", breath: "in" },
  { s: "grounding", t: "And release…", breath: "out", p: 2 },
  { s: "grounding", t: "I am Betty. And this is English Unlocked.", betty: true, p: 1.5 },

  // 2 — The Map
  { s: "map", t: "Today, we practice English for a job interview." },
  { s: "map", t: "An interview is just a calm conversation about your value.", p: 2 },
  { s: "map", t: "After this, you can settle your nerves and answer the hard questions steadily.", p: 2 },

  // 3 — Listening
  { s: "listening", t: "First, just listen." },
  { s: "listening", t: "Notice how steady and warm each phrase sounds.", p: 3 },
  ...euPass("listening", LISTEN, "listen", 4),

  // 4 — Articulation
  { s: "articulation", t: "Now, it is your turn." },
  { s: "articulation", t: "Slowly. Let your voice sound calm and sure.", p: 3 },
  ...euPass("articulation", SLOW, "repeat", 6),

  // 5 — Rhythm
  { s: "rhythm", t: "Wonderful. Now connect the words." },
  { s: "rhythm", t: "Natural and relaxed, like you already belong there.", p: 3 },
  ...euPass("rhythm", NATURAL, "repeat", 4),

  // 6 — The Anchor
  { s: "anchor", t: "You did great.", p: 2 },
  { s: "anchor", t: "Pausing to think is a sign of confidence, not weakness." },
  { s: "anchor", t: "Walk in slow, breathe, and let these phrases carry you.", p: 3 },
  { s: "anchor", t: "Slow English. Clear mind." },
  { s: "anchor", t: "This is English Unlocked." },
];

// English-to-English vocab cards — calm moments only, anchored to a narration line.
const VOCAB = [
  { word: "interview", pos: "noun", def: "A meeting where someone asks about your skills and experience.", anchor: "An interview is just" },
  { word: "nerves", pos: "noun", def: "The shaky feeling before something important.", anchor: "settle your nerves" },
  { word: "confidence", pos: "noun", def: "The calm feeling that you can do this.", anchor: "sign of confidence" },
];

window.EPISODE = buildEpisodeEU({
  epNumber: 12, title: "The Job Interview",
  hook: "The job interview in English — steady voice, honest answers.",
  sections: SECTIONS, phaseOrder: PHASE_ORDER,
  script: SCRIPT, vocab: VOCAB,
});
