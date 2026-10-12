// data-ep10.jsx — English Unlocked · Episode 10 "The Full Flow" (the masterpiece)
// Every skill combined in one real conversation simulation. Longer finale.
// 6 phases, but Phase 5 is an interactive SIMULATION:
//   • speaker:"betty" lines  → Betty on screen, she says a line
//   • youTurn:true  lines    → the orb + mic countdown; you reply with the phrase
// English ONLY on screen. Timed by episode-engine.jsx.

const SECTIONS = {
  grounding:    { n: 1, label: "Grounding" },
  map:          { n: 2, label: "The Map" },
  listening:    { n: 3, label: "Listening" },
  articulation: { n: 4, label: "Articulation" },
  simulation:   { n: 5, label: "Simulation" },
  anchor:       { n: 6, label: "The Anchor" },
};
const PHASE_ORDER = ["grounding", "map", "listening", "articulation", "simulation", "anchor"];

// Phase 2 — Slow Articulation (six pieces of the conversation, with pacing breaks)
const SLOW = [
  "How has your day… been so far?",
  "Well, let me think about that…",
  "It’s been a long week… hasn’t it?",
  "I completely agree… with you on that.",
  "The way I see it… we all need a break.",
  "Anyway… I won’t keep you any longer.",
];

const SCRIPT = [
  // 1 — Grounding
  { s: "grounding", t: "Welcome to your final practice in this series." },
  { s: "grounding", t: "Take the deepest breath you have taken today. Inhale…", breath: "in" },
  { s: "grounding", t: "And let everything go.", breath: "out", p: 2 },
  { s: "grounding", t: "I am Betty. And this is English Unlocked.", betty: true, p: 1.5 },

  // 2 — The Map
  { s: "map", t: "Today is The Full Flow." },
  { s: "map", t: "We are going to put everything together: opening, buying time, agreeing, expressing an opinion, and making a graceful exit.", p: 3 },
  { s: "map", t: "This is a real conversation simulation. I will guide you through it.", p: 3 },

  // 3 — Listening (hear the whole interaction flow once)
  { s: "listening", t: "Just listen to the flow of this complete interaction.", p: 3 },
  { s: "listening", t: "“How has your day been so far?”", phrase: true },
  { s: "listening", t: "“Well, let me think about that… it’s been a long week, hasn’t it?”", phrase: true },
  { s: "listening", t: "“I completely agree with you on that.”", phrase: true },
  { s: "listening", t: "“The way I see it, we all need a break.”", phrase: true },
  { s: "listening", t: "“Anyway, I won’t keep you any longer. Have a great rest of your day.”", phrase: true, p: 5 },
  { s: "listening", t: "Notice how natural that sounds. No complex grammar. Just pure connection.", p: 2 },

  // 4 — Slow Articulation (sentence by sentence)
  { s: "articulation", t: "Now, we practice sentence by sentence." },
  { s: "articulation", t: "Listen. And repeat.", p: 3 },
  ...euPass("articulation", SLOW, "repeat", 6),

  // 5 — The Simulation (Betty speaks, then it is your turn)
  { s: "simulation", t: "Now, let’s have a conversation. I will say a line, and you will respond with the next phrase." },
  { s: "simulation", t: "Take your time.", p: 3 },

  { s: "simulation", t: "“Hey there!”", speaker: "betty", betty: true },
  { s: "simulation", t: "How has your day been so far?", phrase: true, pass: "repeat", youTurn: true, p: 5 },

  { s: "simulation", t: "“Oh, it’s been so busy. What about you?”", speaker: "betty", betty: true },
  { s: "simulation", t: "Well, let me think about that… it’s been a long week, hasn’t it?", phrase: true, pass: "repeat", youTurn: true, p: 7 },

  { s: "simulation", t: "“Yes, exactly! We definitely need the weekend.”", speaker: "betty", betty: true },
  { s: "simulation", t: "I completely agree with you on that. The way I see it, we all need a break.", phrase: true, pass: "repeat", youTurn: true, p: 8 },

  { s: "simulation", t: "“So true. Well, I have to get back to my desk.”", speaker: "betty", betty: true },
  { s: "simulation", t: "Anyway, I won’t keep you any longer. Have a great rest of your day.", phrase: true, pass: "repeat", youTurn: true, p: 6 },

  // 6 — The Anchor
  { s: "anchor", t: "You did it.", p: 3 },
  { s: "anchor", t: "You have unlocked a new level of calm." },
  { s: "anchor", t: "You don’t need a new language. You just needed a new mindset.", p: 3 },
  { s: "anchor", t: "Keep practicing. Keep breathing." },
  { s: "anchor", t: "I am so proud of you.", p: 3 },
  { s: "anchor", t: "Slow English. Clear mind." },
  { s: "anchor", t: "This is English Unlocked." },
];

// English-to-English vocab cards — calm moments only, anchored to a narration line.
const VOCAB = [
  { word: "simulation",  pos: "noun", def: "A practice version of a real situation.",   anchor: "conversation simulation" },
  { word: "interaction", pos: "noun", def: "A back-and-forth exchange between people.",  anchor: "complete interaction" },
  { word: "mindset",     pos: "noun", def: "The way you think and approach things.",     anchor: "new mindset" },
  { word: "calm",        pos: "noun", def: "A peaceful, settled state with no stress.",  anchor: "level of calm" },
];

window.EPISODE = buildEpisodeEU({
  epNumber: 10, title: "The Full Flow",
  hook: "Everything you learned, in one flowing conversation.",
  sections: SECTIONS, phaseOrder: PHASE_ORDER,
  script: SCRIPT, vocab: VOCAB,
});
