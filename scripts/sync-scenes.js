#!/usr/bin/env node
// Kopierar docs/scenes/*.md → web/content/scenes/
// Körs som prebuild/predev så att webb-PoC alltid har senaste scen-innehåll.
//
// Skippar tyst om docs/scenes/ inte existerar — det är fallet på Vercel
// där bara web/ är checked out. Då används redan-committat innehåll i
// web/content/scenes/.

const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "docs", "scenes");
const DST = path.join(ROOT, "web", "content", "scenes");

if (!fs.existsSync(SRC)) {
  console.log(`sync-scenes: källa saknas (${SRC}) — hoppar över. Använder befintligt innehåll i web/content/scenes/.`);
  process.exit(0);
}

fs.mkdirSync(DST, { recursive: true });

const files = fs.readdirSync(SRC).filter((f) => f.endsWith(".md"));
let copied = 0;
for (const f of files) {
  const src = path.join(SRC, f);
  const dst = path.join(DST, f);
  const a = fs.readFileSync(src);
  let needsCopy = true;
  if (fs.existsSync(dst)) {
    const b = fs.readFileSync(dst);
    if (a.equals(b)) needsCopy = false;
  }
  if (needsCopy) {
    fs.writeFileSync(dst, a);
    copied += 1;
  }
}
console.log(`sync-scenes: ${files.length} scener (${copied} uppdaterade)`);
