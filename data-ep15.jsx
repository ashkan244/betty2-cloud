// data-ep15.jsx — English Unlocked · Episode 15 "Making Plans & Invitations"
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
  "Are you free this weekend?",
  "Do you want to grab a coffee?",
  "Let’s play it by ear…",
  "That works for me…",
  "I’ll text you the details…",
];
const SLOW = [
  "Are you free… this weekend?",
  "Do you want… to grab a coffee?",
  "Let’s… play it by ear.",
  "That… works for me.",
  "I’ll text you… the details.",
];
const NATURAL = [
  "Are you free this weekend?",
  "Do you want to grab a coffee?",
  "Let’s play it by ear.",
  "That works for me.",
  "I’ll text you the details.",
];

const SCRIPT = [
  // 1 — Grounding
  { s: "grounding", t: "Welcome back to your easy practice." },
  { s: "grounding", t: "Breathe in…", breath: "in" },
  { s: "grounding", t: "And out…", breath: "out", p: 2 },
  { s: "grounding", t: "I am Betty. And this is English Unlocked.", betty: true, p: 1.5 },

  // 2 — The Map
  { s: "map", t: "Today, we practice making plans and invitations." },
  { s: "map", t: "Many learners want to invite a friend, but freeze.", p: 2 },
  { s: "map", t: "After this, you can invite someone easily, and settle a plan.", p: 2 },

  // 3 — Listening
  { s: "listening", t: "First, just listen." },
  { s: "listening", t: "Hear the light, friendly music in each line.", p: 3 },
  ...euPass("listening", LISTEN, "listen", 4),

  // 4 — Articulation
  { s: "articulation", t: "Now, it is your turn." },
  { s: "articulation", t: "Slowly. Let your voice sound warm and open.", p: 3 },
  ...euPass("articulation", SLOW, "repeat", 6),

  // 5 — Rhythm
  { s: "rhythm", t: "Lovely. Now let it flow." },
  { s: "rhythm", t: "Natural speed, like talking to an old friend.", p: 3 },
  ...euPass("rhythm", NATURAL, "repeat", 4),

  // 6 — The Anchor
  { s: "anchor", t: "Beautifully done.", p: 2 },
  { s: "anchor", t: "A simple invitation can start a whole friendship." },
  { s: "anchor", t: "Next time, you will not let the moment pass.", p: 3 },
  { s: "anchor", t: "Slow English. Clear mind." },
  { s: "anchor", t: "This is English Unlocked." },
];

// English-to-English vocab cards — calm moments only, anchored to a narration line.
const VOCAB = [
  { word: "invite", pos: "verb", def: "To ask someone to join you for something.", anchor: "invite a friend" },
  { word: "settle", pos: "verb", def: "To agree on something finally, so it is decided.", anchor: "settle a plan" },
  { word: "invitation", pos: "noun", def: "The offer you make when you invite someone.", anchor: "A simple invitation" },
];

window.EPISODE = buildEpisodeEU({
  epNumber: 15, title: "Making Plans & Invitations",
  hook: "Invite someone in English — and actually settle the plan.",
  sections: SECTIONS, phaseOrder: PHASE_ORDER,
  script: SCRIPT, vocab: VOCAB,
});
