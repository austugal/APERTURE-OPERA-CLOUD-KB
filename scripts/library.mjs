// Regenerates reference-docs/index.json, the opera-doc allow-list and the library tiles
// from whatever markdown sits in reference-docs/. Add a document, run the build, done.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
const CATS = [
  ['Fiscal and compliance', /fiscal|saf|sii|france|emea|city-tax/],
  ['Integrations and OHIP', /ohip|oxi|ifc8|interface|exchange|channel|revenue-management|ideas|certified|ssd|community|opi/],
  ['Delivery and go-live', /cutover|hypercare|go-live|migration|piw|workstation|opera5|night-audit|checklist|support|walkthrough/],
  ['Training', /training|getting-started|glossary|user-guide/],
  ['Configuration', /./]
];
const index = [];
for (const f of readdirSync('reference-docs').filter(f => f.endsWith('.md') && f.toLowerCase() !== 'readme.md').sort()) {
  const md = readFileSync('reference-docs/' + f, 'utf8');
  const body = md.replace(/^---[\s\S]*?---\s*/, '');
  const title = (body.match(/^#\s+(.+)$/m) || [, f.replace(/\.md$/, '')])[1].replace(/[*`]/g, '').trim();
  const para = body.split(/\r?\n\r?\n/).map(p => p.trim()).find(p => p && !p.startsWith('#') && !p.startsWith('|') && !p.startsWith('>') && !p.startsWith('---') && p.length > 40) || '';
  const desc = para.replace(/[*`_#>\[\]]/g, '').replace(/\(([^)]*)\)/g, '').replace(/\s+/g, ' ').slice(0, 220);
  index.push({ file: f, title, desc, cat: CATS.find(([, re]) => re.test(f))[0] });
}
writeFileSync('reference-docs/index.json', JSON.stringify(index, null, 1));
let doc = readFileSync('opera-doc.html', 'utf8');
writeFileSync('opera-doc.html', doc.replace(/var allowed = \[[\s\S]*?\];/, 'var allowed = ' + JSON.stringify(index.map(d => d.file)) + ';'));
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
let tiles = '';
for (const [cat] of CATS) {
  const docs = index.filter(d => d.cat === cat);
  if (!docs.length) continue;
  tiles += `\n    <h3 class="span-12 lib-cat" style="grid-column:1/-1;margin:24px 0 4px;font-size:15px;letter-spacing:.08em;text-transform:uppercase">${esc(cat)} · ${docs.length}</h3>\n`;
  for (const d of docs) tiles += `    <a href="opera-doc.html?file=${d.file}" class="tile span-6 module-tile"><div class="head"><h3>${esc(d.title)}</h3></div><p class="desc">${esc(d.desc)}</p><div class="foot"><span>${esc(cat.toUpperCase())}</span><span class="badge">Read →</span></div></a>\n`;
}
let lib = readFileSync('opera-library.html', 'utf8');
lib = lib.replace(/<div class="tiles">[\s\S]*?\n  <\/div>\r?\n\r?\n  <div class="disclaimer"/, `<div class="tiles">${tiles}  </div>\n\n  <div class="disclaimer"`);
lib = lib.replace(/<span class="count">[^<]*<\/span>/, `<span class="count">${index.length} DOCUMENTS</span>`).replace(/id="topic-count"([^>]*)>[^<]*</, `id="topic-count"$1>${index.length} documents<`);
writeFileSync('opera-library.html', lib);
console.log('library', index.length, 'documents');
