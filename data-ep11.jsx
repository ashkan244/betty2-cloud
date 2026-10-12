// data-ep11.jsx — English Unlocked · Episode 11 "Phone & Video Calls"
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
  "Can everyone hear me okay?",
  "Sorry, you cut out for a second…",
  "Could you say that one more time?",
  "Let me share my screen…",
  "Let’s pick this up over email…",
];
const SLOW = [
  "Can everyone… hear me okay?",
  "Sorry, you cut out… for a second.",
  "Could you say that… one more time?",
  "Let me… share my screen.",
  "Let’s pick this up… over email.",
];
const NATURAL = [
  "Can everyone hear me okay?",
  "Sorry, you cut out for a second.",
  "Could you say that one more time?",
  "Let me share my screen.",
  "Let’s pick this up over email.",
];

const SCRIPT = [
  // 1 — Grounding
  { s: "grounding", t: "Welcome back to your shadowing practice." },
  { s: "grounding", t: "Before we begin, let the day fall away.", p: 3 },
  { s: "grounding", t: "Wherever you are, soften your shoulders." },
  { s: "grounding", t: "Take a slow breath in…", breath: "in" },
  { s: "grounding", t: "And let it go…", breath: "out", p: 3 },
  { s: "grounding", t: "You don’t need the perfect words today." },
  { s: "grounding", t: "You only need to be here.", p: 2 },
  { s: "grounding", t: "I am Betty. And this is English Unlocked.", betty: true, p: 2 },

  // 2 — The Map
  { s: "map", t: "Today, we practice English for phone and video calls." },
  { s: "map", t: "On a call, there is no body language to lean on." },
  { s: "map", t: "The line drops, voices overlap, and the mind freezes.", p: 3 },
  { s: "map", t: "So we will rehearse a few calm phrases for those moments," },
  { s: "map", t: "so you can stay in control when the connection is not.", p: 3 },

  // 3 — Listening
  { s: "listening", t: "First, just listen." },
  { s: "listening", t: "Do not speak. Let the sounds settle in.", p: 3 },
  ...euPass("listening", LISTEN, "listen", 4),

  // 4 — Articulation
  { s: "articulation", t: "Now, it is your turn." },
  { s: "articulation", t: "Speak slowly. Feel each word in your mouth.", p: 3 },
  ...euPass("articulation", SLOW, "repeat", 6),

  // 5 — Rhythm
  { s: "rhythm", t: "Lovely. Now let the words connect." },
  { s: "rhythm", t: "Natural speed. Smooth, like one breath.", p: 3 },
  ...euPass("rhythm", NATURAL, "repeat", 4),

  // 6 — The Anchor
  { s: "anchor", t: "You did beautifully.", p: 2 },
  { s: "anchor", t: "A dropped line is not your fault — it happens to everyone." },
  { s: "anchor", t: "Next time the call freezes, you will stay calm." },
  { s: "anchor", t: "You have your phrases now.", p: 3 },
  { s: "anchor", t: "Slow English. Clear mind." },
  { s: "anchor", t: "This is English Unlocked." },
];

// English-to-English vocab cards — calm moments only, anchored to a narration line.
const VOCAB = [
  { word: "cut out",       pos: "phrasal verb", def: "When a voice or signal suddenly stops for a moment during a call.", anchor: "The line drops" },
  { word: "body language", pos: "noun",         def: "The messages your face and body send without words.",              anchor: "body language" },
  { word: "in control",    pos: "phrase",       def: "Calm and steady — able to handle what is happening.",              anchor: "stay in control" },
];

window.EPISODE = buildEpisodeEU({
  epNumber: 11, title: "Phone & Video Calls",
  sections: SECTIONS, phaseOrder: PHASE_ORDER,
  script: SCRIPT, vocab: VOCAB,
});
