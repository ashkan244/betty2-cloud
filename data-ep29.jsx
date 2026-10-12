// data-ep29.jsx — English Unlocked · Episode 29 "Keeping the Conversation Going"
// Season 3 — Out in the World. Short-open build (see data-ep21.jsx header).
// Pairs with Ep 05 (openers): that episode STARTS a conversation, this one keeps
// it alive past the first thirty seconds. English ONLY on screen.

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
  "Oh really? What happened next?",
  "That reminds me of something similar.",
  "How did you feel about that?",
  "Wait — tell me more about that part.",
  "We should talk about this again.",
];
const SLOW = [
  "Oh really?… What happened next?",
  "That reminds me… of something similar.",
  "How did you feel… about that?",
  "Wait… tell me more about that part.",
  "We should talk about this… again.",
];
const NATURAL = [
  "Oh really? What happened next?",
  "That reminds me of something similar.",
  "How did you feel about that?",
  "Wait — tell me more about that part.",
  "We should talk about this again.",
];

const SCRIPT = [
  // 1 — Grounding
  { s: "grounding", t: "Welcome back. Let’s get your voice ready." },
  { s: "grounding", t: "Breathe in…", breath: "in" },
  { s: "grounding", t: "And out…", breath: "out", p: 2 },
  { s: "grounding", t: "I am Betty. And this is English Unlocked.", betty: true, p: 1.5 },

  // 2 — The Map
  { s: "map", t: "Today, we practice keeping a conversation alive." },
  { s: "map", t: "Starting is easy. It is the silence afterwards that hurts.", p: 2 },
  { s: "map", t: "After this, you can follow up — and let the other person keep talking.", p: 2 },

  // 3 — Listening
  { s: "listening", t: "First, just listen." },
  ...euPass("listening", LISTEN, "listen", 3.5),

  // 4 — Articulation
  { s: "articulation", t: "Now it is your turn. Slowly, with a curious voice." },
  ...euPass("articulation", SLOW, "repeat", 6),

  // 5 — Rhythm
  { s: "rhythm", t: "Good. Now let it flow, at natural speed." },
  ...euPass("rhythm", NATURAL, "repeat", 4),

  // 6 — The Anchor
  { s: "anchor", t: "Beautifully done.", p: 1.5 },
  { s: "anchor", t: "Now hear it as one real moment:" },
  { s: "anchor", t: "“…and then we missed the train.” — “Oh really? What happened next?”", p: 2 },
  { s: "anchor", t: "You do not need more words. You need better questions.", p: 2 },
  { s: "anchor", t: "Slow English. Clear mind. This is English Unlocked." },
];

// English-to-English vocab cards — calm moments only, anchored to a narration line.
const VOCAB = [
  { word: "follow up", pos: "phrase",    def: "To ask one more question about what was just said.", anchor: "you can follow up" },
  { word: "alive",     pos: "adjective", def: "Still going, still full of energy.",                 anchor: "conversation alive" },
  { word: "curious",   pos: "adjective", def: "Really wanting to know more.",                       anchor: "a curious voice" },
];

window.EPISODE = buildEpisodeEU({
  epNumber: 29, title: "Keeping the Conversation Going",
  hook: "The silence after “hello” — five ways to fill it.",
  sections: SECTIONS, phaseOrder: PHASE_ORDER,
  script: SCRIPT, vocab: VOCAB,
});
