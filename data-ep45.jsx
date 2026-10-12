// data-ep45.jsx — English Unlocked · Episode 45 "Speaking Up in a Meeting"
// Season 5 — Getting Things Done. House format (see data-ep22.jsx): short open, 5 phrases,
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
  "Sorry, can I just add something?",
  "I see it a little differently.",
  "Could you go back to that slide?",
  "Just to check, are we agreeing on Friday?",
  "Great, I’ll send a short summary later.",
];
const SLOW = [
  "Sorry… can I just add something?",
  "I see it… a little differently.",
  "Could you go back… to that slide?",
  "Just to check… are we agreeing on Friday?",
  "Great… I’ll send a short summary later.",
];
const NATURAL = [
  "Sorry, can I just add something?",
  "I see it a little differently.",
  "Could you go back to that slide?",
  "Just to check, are we agreeing on Friday?",
  "Great, I’ll send a short summary later.",
];

const SCRIPT = [
  // 1 — Grounding
  { s: "grounding", t: "Welcome back. Let’s get your voice ready." },
  { s: "grounding", t: "Breathe in…", breath: "in" },
  { s: "grounding", t: "And out…", breath: "out", p: 2 },
  { s: "grounding", t: "I am Betty. And this is English Unlocked.", betty: true, p: 1.5 },

  // 2 — The Map
  { s: "map", t: "Today, we practice speaking up in a meeting." },
  { s: "map", t: "In meetings, the moment to speak passes quickly.", p: 2 },
  { s: "map", t: "After this, you can join the discussion politely, and help close it.", p: 2 },

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
  { s: "anchor", t: "Beautifully done.", p: 1.5 },
  { s: "anchor", t: "Now hear it as one real moment:" },
  { s: "anchor", t: "“Any other thoughts before we finish?” — “Sorry, can I just add something?”", p: 2 },
  { s: "anchor", t: "Your idea counts, even when your accent shows.", p: 2 },
  { s: "anchor", t: "Slow English. Clear mind. This is English Unlocked." },
];

// English-to-English vocab cards — calm moments only, anchored to a narration line.
const VOCAB = [
  { word: "pass", pos: "verb", def: "To go by; to end.", anchor: "speak passes quickly" },
  { word: "discussion", pos: "noun", def: "A conversation about a subject, with different opinions.", anchor: "join the discussion" },
  { word: "accent", pos: "noun", def: "The way you sound when you speak, from where you grew up.", anchor: "your accent shows" },
];

window.EPISODE = buildEpisodeEU({
  epNumber: 45, title: "Speaking Up in a Meeting",
  hook: "Speak up in a meeting — even when your English isn’t perfect.",
  sections: SECTIONS, phaseOrder: PHASE_ORDER,
  script: SCRIPT, vocab: VOCAB,
});
