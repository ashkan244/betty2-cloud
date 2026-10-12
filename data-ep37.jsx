// data-ep37.jsx — English Unlocked · Episode 37 "Talking About Your Weekend"
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
  "It was quiet, but really relaxing.",
  "We went for a long walk by the river.",
  "What about you? Did you do anything fun?",
  "Would you recommend that place to me?",
  "Nothing special, but it was really nice.",
];
const SLOW = [
  "It was quiet… but really relaxing.",
  "We went for a long walk… by the river.",
  "What about you?… Did you do anything fun?",
  "Would you recommend… that place to me?",
  "Nothing special… but it was really nice.",
];
const NATURAL = [
  "It was quiet, but really relaxing.",
  "We went for a long walk by the river.",
  "What about you? Did you do anything fun?",
  "Would you recommend that place to me?",
  "Nothing special, but it was really nice.",
];

const SCRIPT = [
  // 1 — Grounding
  { s: "grounding", t: "Welcome back. Let’s get your voice ready." },
  { s: "grounding", t: "Breathe in…", breath: "in" },
  { s: "grounding", t: "And out…", breath: "out", p: 2 },
  { s: "grounding", t: "I am Betty. And this is English Unlocked.", betty: true, p: 1.5 },

  // 2 — The Map
  { s: "map", t: "Today, we practice talking about the weekend." },
  { s: "map", t: "A one-word answer makes a conversation feel dull.", p: 2 },
  { s: "map", t: "After this, you can turn a short answer into a small story.", p: 2 },

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
  { s: "anchor", t: "“How was your weekend?” — “It was quiet, but really relaxing.”", p: 2 },
  { s: "anchor", t: "Small stories are how strangers become friends.", p: 2 },
  { s: "anchor", t: "Slow English. Clear mind. This is English Unlocked." },
];

// English-to-English vocab cards — calm moments only, anchored to a narration line.
const VOCAB = [
  { word: "dull", pos: "adjective", def: "Boring — without interest or energy.", anchor: "feel dull" },
  { word: "turn into", pos: "phrasal verb", def: "To change something so it becomes something else.", anchor: "turn a short answer into" },
  { word: "stranger", pos: "noun", def: "A person you do not know yet.", anchor: "how strangers become" },
];

window.EPISODE = buildEpisodeEU({
  epNumber: 37, title: "Talking About Your Weekend",
  hook: "“How was your weekend?” — answer with a real story.",
  sections: SECTIONS, phaseOrder: PHASE_ORDER,
  script: SCRIPT, vocab: VOCAB,
});
