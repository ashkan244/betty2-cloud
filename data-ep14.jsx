// data-ep14.jsx — English Unlocked · Episode 14 "Apologizing & Fixing Mistakes"
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
  "I’m so sorry about the mix-up…",
  "That’s on me…",
  "Let me make it right…",
  "Thank you for your patience…",
  "It won’t happen again…",
];
const SLOW = [
  "I’m so sorry… about the mix-up.",
  "That’s… on me.",
  "Let me… make it right.",
  "Thank you… for your patience.",
  "It won’t… happen again.",
];
const NATURAL = [
  "I’m so sorry about the mix-up.",
  "That’s on me.",
  "Let me make it right.",
  "Thank you for your patience.",
  "It won’t happen again.",
];

const SCRIPT = [
  // 1 — Grounding
  { s: "grounding", t: "Welcome back. Let’s breathe first." },
  { s: "grounding", t: "Breathe in…", breath: "in" },
  { s: "grounding", t: "And out…", breath: "out", p: 2 },
  { s: "grounding", t: "I am Betty. And this is English Unlocked.", betty: true, p: 1.5 },

  // 2 — The Map
  { s: "map", t: "Today, we practice apologizing and fixing mistakes." },
  { s: "map", t: "When we feel guilty, we make long, tangled excuses.", p: 2 },
  { s: "map", t: "After this, you can take responsibility in one clean sentence, and move on.", p: 2 },

  // 3 — Listening
  { s: "listening", t: "First, just listen." },
  { s: "listening", t: "Hear how short and sincere each line is.", p: 3 },
  ...euPass("listening", LISTEN, "listen", 4),

  // 4 — Articulation
  { s: "articulation", t: "Now, it is your turn." },
  { s: "articulation", t: "Slowly. Let your voice be calm, not anxious.", p: 3 },
  ...euPass("articulation", SLOW, "repeat", 6),

  // 5 — Rhythm
  { s: "rhythm", t: "Good. Now connect the words." },
  { s: "rhythm", t: "Natural and warm, looking the person in the eye.", p: 3 },
  ...euPass("rhythm", NATURAL, "repeat", 4),

  // 6 — The Anchor
  { s: "anchor", t: "Well done.", p: 2 },
  { s: "anchor", t: "A good apology is short, honest, and forward-looking." },
  { s: "anchor", t: "You can repair almost anything with these words.", p: 3 },
  { s: "anchor", t: "Slow English. Clear mind." },
  { s: "anchor", t: "This is English Unlocked." },
];

// English-to-English vocab cards — calm moments only, anchored to a narration line.
const VOCAB = [
  { word: "guilty", pos: "adjective", def: "Feeling bad because you did something wrong.", anchor: "feel guilty" },
  { word: "responsibility", pos: "noun", def: "Accepting that something was yours to do.", anchor: "take responsibility" },
  { word: "apology", pos: "noun", def: "Words that say sorry, and mean it.", anchor: "A good apology" },
];

window.EPISODE = buildEpisodeEU({
  epNumber: 14, title: "Apologizing & Fixing Mistakes",
  hook: "Apologize in English in one clean sentence.",
  sections: SECTIONS, phaseOrder: PHASE_ORDER,
  script: SCRIPT, vocab: VOCAB,
});
