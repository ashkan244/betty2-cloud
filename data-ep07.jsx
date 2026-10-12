// data-ep07.jsx — English Unlocked · Episode 07 "Storytelling Connectors"
// How to explain an idea or story without losing your thread.
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
  "It all started when…",
  "And then, out of nowhere…",
  "The funny thing is…",
  "At first, I wasn’t sure, but…",
  "In the end, it turned out that…",
];
const SLOW = [
  "It all started… when…",
  "And then… out of nowhere…",
  "The funny thing… is…",
  "At first… I wasn’t sure… but…",
  "In the end… it turned out that…",
];
const NATURAL = [
  "It all started when…",
  "And then, out of nowhere…",
  "The funny thing is…",
  "At first, I wasn’t sure, but…",
  "In the end, it turned out that…",
];

const SCRIPT = [
  // 1 — Grounding
  { s: "grounding", t: "Welcome to your shadowing practice." },
  { s: "grounding", t: "Take a deep breath in…", breath: "in" },
  { s: "grounding", t: "And breathe out.", breath: "out", p: 2 },
  { s: "grounding", t: "I am Betty. And this is English Unlocked.", betty: true, p: 1.5 },

  // 2 — The Map
  { s: "map", t: "Today, we are practicing Storytelling Connectors." },
  { s: "map", t: "When introverts tell a story, we often speak too fast. We want to finish quickly so people stop looking at us.", p: 2 },
  { s: "map", t: "After this, you can use connectors to tell a story slowly, and keep people listening.", p: 2 },

  // 3 — Listening
  { s: "listening", t: "Just listen." },
  { s: "listening", t: "Notice how these phrases build anticipation.", p: 3 },
  ...euPass("listening", LISTEN, "listen", 4),

  // 4 — Slow Articulation
  { s: "articulation", t: "Now, practice with me." },
  { s: "articulation", t: "Speak slowly. Be the storyteller." },
  { s: "articulation", t: "Listen. And repeat.", p: 3 },
  ...euPass("articulation", SLOW, "repeat", 6),

  // 5 — Natural Rhythm
  { s: "rhythm", t: "Beautiful." },
  { s: "rhythm", t: "Now, the natural flow. Imagine you are telling a friend a story over coffee.", p: 3 },
  ...euPass("rhythm", NATURAL, "repeat", 5),

  // 6 — The Anchor
  { s: "anchor", t: "Great job.", p: 2 },
  { s: "anchor", t: "Your stories matter. Take your space. Take your time." },
  { s: "anchor", t: "People want to hear what you have to say.", p: 3 },
  { s: "anchor", t: "Slow English. Clear mind." },
  { s: "anchor", t: "This is English Unlocked." },
];

// English-to-English vocab cards — calm moments only, anchored to a narration line.
const VOCAB = [
  { word: "introvert", pos: "noun", def: "Someone who finds quiet restful and crowds tiring.", anchor: "When introverts tell" },
  { word: "connector", pos: "noun", def: "A small word that joins one part of a story to the next.", anchor: "use connectors" },
  { word: "space", pos: "noun", def: "Room and time that belong to you.", anchor: "Take your space" },
];

window.EPISODE = buildEpisodeEU({
  epNumber: 7, title: "Storytelling Connectors",
  hook: "Tell a story in English, slowly, and keep people listening.",
  sections: SECTIONS, phaseOrder: PHASE_ORDER,
  script: SCRIPT, vocab: VOCAB,
});
