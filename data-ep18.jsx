// data-ep18.jsx — English Unlocked · Episode 18 "Disagreeing Politely"
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
  "I see your point, but…",
  "I’m not so sure about that…",
  "Can I offer another way to look at it?",
  "That’s fair, but here’s my concern…",
  "Let’s agree to disagree…",
];
const SLOW = [
  "I see your point… but.",
  "I’m not so sure… about that.",
  "Can I offer… another way to look at it?",
  "That’s fair… but here’s my concern.",
  "Let’s… agree to disagree.",
];
const NATURAL = [
  "I see your point, but…",
  "I’m not so sure about that.",
  "Can I offer another way to look at it?",
  "That’s fair, but here’s my concern.",
  "Let’s agree to disagree.",
];

const SCRIPT = [
  // 1 — Grounding
  { s: "grounding", t: "Welcome back. Disagreement does not have to mean conflict." },
  { s: "grounding", t: "Breathe in…", breath: "in" },
  { s: "grounding", t: "And out…", breath: "out", p: 2 },
  { s: "grounding", t: "I am Betty. And this is English Unlocked.", betty: true, p: 1.5 },

  // 2 — The Map
  { s: "map", t: "Today, we practice disagreeing politely." },
  { s: "map", t: "When we disagree, the voice often turns sharp or shaky.", p: 2 },
  { s: "map", t: "After this, you can soften your opener, and keep your voice calm and steady.", p: 2 },

  // 3 — Listening
  { s: "listening", t: "First, just listen." },
  { s: "listening", t: "Notice how each phrase agrees a little, then turns gently.", p: 3 },
  ...euPass("listening", LISTEN, "listen", 4),

  // 4 — Articulation
  { s: "articulation", t: "Now, it is your turn." },
  { s: "articulation", t: "Slowly. Keep your voice calm, never sharp.", p: 3 },
  ...euPass("articulation", SLOW, "repeat", 6),

  // 5 — Rhythm
  { s: "rhythm", t: "Good. Now let it flow." },
  { s: "rhythm", t: "Natural speed, steady and respectful.", p: 3 },
  ...euPass("rhythm", NATURAL, "repeat", 4),

  // 6 — The Anchor
  { s: "anchor", t: "Well done.", p: 2 },
  { s: "anchor", t: "Softening your words first opens the other person’s ears." },
  { s: "anchor", t: "You can stand your ground and stay warm.", p: 3 },
  { s: "anchor", t: "Slow English. Clear mind." },
  { s: "anchor", t: "This is English Unlocked." },
];

// English-to-English vocab cards — calm moments only, anchored to a narration line.
const VOCAB = [
  { word: "sharp", pos: "adjective", def: "Cutting — a voice that sounds hard or angry.", anchor: "turns sharp" },
  { word: "soften", pos: "verb", def: "To make something gentler.", anchor: "soften your opener" },
  { word: "stand your ground", pos: "phrase", def: "To keep your position, calmly, under pressure.", anchor: "stand your ground" },
];

window.EPISODE = buildEpisodeEU({
  epNumber: 18, title: "Disagreeing Politely",
  hook: "Disagree in English without the sharp voice.",
  sections: SECTIONS, phaseOrder: PHASE_ORDER,
  script: SCRIPT, vocab: VOCAB,
});
