// data-ep01.jsx — English Unlocked · Episode 01 "Survival Phrases"
// What to say when your mind goes blank. 6-phase slow shadowing.
// English ONLY on screen. Timed by episode-engine.jsx (loaded first).
//
// Tune pace here if your recorded voiceover runs longer/shorter:
//   config.rate (sec/word) ·  the `p:` values are the learner's speaking pauses.

const SECTIONS = {
  grounding:    { n: 1, label: "Grounding" },
  map:          { n: 2, label: "The Map" },
  listening:    { n: 3, label: "Listening" },
  articulation: { n: 4, label: "Articulation" },
  rhythm:       { n: 5, label: "Rhythm" },
  anchor:       { n: 6, label: "The Anchor" },
};
const PHASE_ORDER = ["grounding", "map", "listening", "articulation", "rhythm", "anchor"];

// the five survival phrases, in three on-screen variants
const LISTEN = [   // Phase 1 — heard, soft trailing rest
  "Give me just a second…",
  "I lost my train of thought…",
  "Let me start over…",
  "It’s on the tip of my tongue…",
  "Give me a moment to think about that…",
];
const SLOW = [     // Phase 2 — repeated slowly, with a pacing break
  "Give me… just a second.",
  "I lost… my train of thought.",
  "Let me… start over.",
  "It’s on the tip… of my tongue.",
  "Give me a moment… to think about that.",
];
const NATURAL = [  // Phase 3 — natural conversational rhythm
  "Give me just a second.",
  "I lost my train of thought.",
  "Let me start over.",
  "It’s on the tip of my tongue.",
  "Give me a moment to think about that.",
];

const SCRIPT = [
  // 1 — Grounding
  { s: "grounding", t: "Welcome to your shadowing practice." },
  { s: "grounding", t: "Take a slow breath in…", breath: "in" },
  { s: "grounding", t: "And exhale…", breath: "out", p: 2 },
  { s: "grounding", t: "I am Betty. And this is English Unlocked.", betty: true, p: 1.5 },

  // 2 — The Map
  { s: "map", t: "Today, we are practicing Survival Phrases." },
  { s: "map", t: "These are the sentences you use when your mind goes completely blank.", p: 2 },
  { s: "map", t: "After this, the words will come out automatically, even when your mind goes blank.", p: 2 },

  // 3 — Listening (just hear the phrases)
  { s: "listening", t: "First, just listen." },
  { s: "listening", t: "Do not speak. Just let the sounds wash over you." },
  { s: "listening", t: "Notice the rhythm.", p: 3 },
  ...euPass("listening", LISTEN, "listen", 4),

  // 4 — Slow Articulation (repeat slowly)
  { s: "articulation", t: "Now, it is your turn." },
  { s: "articulation", t: "We will speak slowly. Focus on how the words feel in your mouth." },
  { s: "articulation", t: "Listen. And repeat after me.", p: 3 },
  ...euPass("articulation", SLOW, "repeat", 6),

  // 5 — Natural Rhythm
  { s: "rhythm", t: "Beautiful." },
  { s: "rhythm", t: "Now, let’s link the words together." },
  { s: "rhythm", t: "Do not worry about perfect pronunciation. Focus on the flow." },
  { s: "rhythm", t: "Like water.", p: 3 },
  ...euPass("rhythm", NATURAL, "repeat", 4),

  // 6 — The Anchor
  { s: "anchor", t: "You did great.", p: 2 },
  { s: "anchor", t: "Remember, taking a pause in a conversation is a sign of confidence, not weakness." },
  { s: "anchor", t: "Next time you forget a word, you don’t need to panic." },
  { s: "anchor", t: "You have your survival phrases.", p: 3 },
  { s: "anchor", t: "Come back to this practice whenever you feel anxious." },
  { s: "anchor", t: "Slow English. Clear mind." },
  { s: "anchor", t: "This is English Unlocked." },
];

// English-to-English vocab cards — calm moments only, anchored to a narration line.
const VOCAB = [
  { word: "blank", pos: "adjective", def: "Empty — when you cannot think of anything to say.", anchor: "goes completely blank" },
  { word: "automatically", pos: "adverb", def: "Without having to think about it first.", anchor: "come out automatically" },
  { word: "pause", pos: "noun", def: "A short silence while you think.", anchor: "taking a pause" },
];

window.EPISODE = buildEpisodeEU({
  epNumber: 1, title: "Survival Phrases",
  hook: "Your mind goes blank in English? Five sentences that save you.",
  sections: SECTIONS, phaseOrder: PHASE_ORDER,
  script: SCRIPT, vocab: VOCAB,
});
