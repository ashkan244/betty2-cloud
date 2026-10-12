// data-ep19.jsx — English Unlocked · Episode 19 "Comforting a Friend"
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
  "I’m so sorry to hear that…",
  "That sounds really hard…",
  "I’m here for you…",
  "Take all the time you need…",
  "You’re not alone in this…",
];
const SLOW = [
  "I’m so sorry… to hear that.",
  "That sounds… really hard.",
  "I’m… here for you.",
  "Take all the time… you need.",
  "You’re not alone… in this.",
];
const NATURAL = [
  "I’m so sorry to hear that.",
  "That sounds really hard.",
  "I’m here for you.",
  "Take all the time you need.",
  "You’re not alone in this.",
];

const SCRIPT = [
  // 1 — Grounding
  { s: "grounding", t: "Welcome back. Today’s practice is a gentle one." },
  { s: "grounding", t: "Breathe in…", breath: "in" },
  { s: "grounding", t: "And out…", breath: "out", p: 2 },
  { s: "grounding", t: "I am Betty. And this is English Unlocked.", betty: true, p: 1.5 },

  // 2 — The Map
  { s: "map", t: "Today, we practice comforting a friend." },
  { s: "map", t: "When someone is hurting, we freeze and fear saying the wrong thing.", p: 2 },
  { s: "map", t: "After this, you can offer support, and say the right small thing.", p: 2 },

  // 3 — Listening
  { s: "listening", t: "First, just listen." },
  { s: "listening", t: "Hear how soft and unhurried each phrase is.", p: 3 },
  ...euPass("listening", LISTEN, "listen", 4),

  // 4 — Articulation
  { s: "articulation", t: "Now, it is your turn." },
  { s: "articulation", t: "Slowly. Let your voice be warm and low.", p: 3 },
  ...euPass("articulation", SLOW, "repeat", 6),

  // 5 — Rhythm
  { s: "rhythm", t: "Beautiful. Now let it flow." },
  { s: "rhythm", t: "Natural speed, gentle and sincere.", p: 3 },
  ...euPass("rhythm", NATURAL, "repeat", 4),

  // 6 — The Anchor
  { s: "anchor", t: "You did beautifully.", p: 2 },
  { s: "anchor", t: "You do not need perfect words — only a kind presence." },
  { s: "anchor", t: "These phrases are a hand on a friend’s shoulder.", p: 3 },
  { s: "anchor", t: "Slow English. Clear mind." },
  { s: "anchor", t: "This is English Unlocked." },
];

// English-to-English vocab cards — calm moments only, anchored to a narration line.
const VOCAB = [
  { word: "hurting", pos: "verb", def: "Feeling pain, in the body or in the heart.", anchor: "someone is hurting" },
  { word: "support", pos: "noun", def: "Help and care given to someone who needs it.", anchor: "offer support" },
  { word: "presence", pos: "noun", def: "Simply being there with someone.", anchor: "a kind presence" },
];

window.EPISODE = buildEpisodeEU({
  epNumber: 19, title: "Comforting a Friend",
  hook: "A friend is hurting — five things to say in English.",
  sections: SECTIONS, phaseOrder: PHASE_ORDER,
  script: SCRIPT, vocab: VOCAB,
});
