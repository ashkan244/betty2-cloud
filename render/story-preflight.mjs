// Verify the requested story and its assets before launching Chrome or encoding.
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

export function storyPreflight(root, id, { draft = false } = {}) {
  const ctx = { URLSearchParams, location: { search: '' } };
  ctx.window = ctx;
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(root, 'story-data.jsx'), 'utf8'), ctx);
  if (!ctx.STORY_IDS.includes(id)) {
    throw new Error(`Unknown story "${id}". Available: ${ctx.STORY_IDS.join(', ')}`);
  }
  const story = ctx.getStory(id);
  const missing = story.beats.filter(b => !fs.existsSync(path.join(root, b.img)));
  if (missing.length && !draft) {
    throw new Error(`Story "${id}" is missing ${missing.length}/${story.beats.length} images: ${missing.map(b => b.i + 1).join(', ')}. Add its art before final rendering; DRAFT=1 allows a separately named draft.`);
  }
  return { story, missing: missing.map(b => b.img) };
}
