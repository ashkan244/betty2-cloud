// data-ep16.jsx — English Unlocked · Episode 16 "At the Café & Restaurant"
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
  "Could we see the menu, please?",
  "I’ll have the same…",
  "Could I get this to go?",
  "Is this seat taken?",
  "Could we get the check, please?",
];
const SLOW = [
  "Could we… see the menu, please?",
  "I’ll… have the same.",
  "Could I get… this to go?",
  "Is this… seat taken?",
  "Could we get… the check, please?",
];
const NATURAL = [
  "Could we see the menu, please?",
  "I’ll have the same.",
  "Could I get this to go?",
  "Is this seat taken?",
  "Could we get the check, please?",
];

const SCRIPT = [
  // 1 — Grounding
  { s: "grounding", t: "Welcome back. Let’s slow everything down." },
  { s: "grounding", t: "Imagine a warm, quiet café around you.", p: 3 },
  { s: "grounding", t: "Relax your shoulders, and your breath." },
  { s: "grounding", t: "Breathe in…", breath: "in" },
  { s: "grounding", t: "And out…", breath: "out", p: 3 },
  { s: "grounding", t: "Ordering food should feel calm, not scary.", p: 2 },
  { s: "grounding", t: "I am Betty. And this is English Unlocked.", betty: true, p: 2 },

  // 2 — The Map
  { s: "map", t: "Today, we practice English at a café and restaurant." },
  { s: "map", t: "Many learners panic the moment the waiter arrives." },
  { s: "map", t: "The words rush, and a simple order feels impossible.", p: 3 },
  { s: "map", t: "We will practice polite, everyday phrases for ordering," },
  { s: "map", t: "so you can enjoy your meal without the fear.", p: 3 },

  // 3 — Listening
  { s: "listening", t: "First, just listen." },
  { s: "listening", t: "Hear how short and polite each phrase is.", p: 3 },
  ...euPass("listening", LISTEN, "listen", 4),

  // 4 — Articulation
  { s: "articulation", t: "Now, it is your turn." },
  { s: "articulation", t: "Slowly. Imagine smiling at the waiter.", p: 3 },
  ...euPass("articulation", SLOW, "repeat", 6),

  // 5 — Rhythm
  { s: "rhythm", t: "Lovely. Now let it flow." },
  { s: "rhythm", t: "Natural speed, easy and relaxed.", p: 3 },
  ...euPass("rhythm", NATURAL, "repeat", 4),

  // 6 — The Anchor
  { s: "anchor", t: "Well done.", p: 2 },
  { s: "anchor", t: "A please and a smile open every door." },
  { s: "anchor", t: "Next time you eat out, these words will be ready.", p: 3 },
  { s: "anchor", t: "Slow English. Clear mind." },
  { s: "anchor", t: "This is English Unlocked." },
];

// English-to-English vocab cards — calm moments only, anchored to a narration line.
const VOCAB = [
  { word: "waiter", pos: "noun",   def: "The person who serves your food at a restaurant.",          anchor: "the waiter arrives" },
  { word: "order",  pos: "noun",   def: "The food and drink you ask for.",                           anchor: "a simple order" },
  { word: "meal",   pos: "noun",   def: "The food you eat at one time — breakfast, lunch, or dinner.", anchor: "enjoy your meal" },
];

window.EPISODE = buildEpisodeEU({
  epNumber: 16, title: "At the Café & Restaurant",
  sections: SECTIONS, phaseOrder: PHASE_ORDER,
  script: SCRIPT, vocab: VOCAB,
});
