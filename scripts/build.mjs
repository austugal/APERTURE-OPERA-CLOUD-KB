import { readFileSync, writeFileSync, mkdirSync, readdirSync, cpSync } from 'node:fs';
function clean(s) { return s.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/&nbsp;/g,' ').replace(/&[a-z]+;/g,' ').replace(/\s+/g,' ').trim(); }
const records = [];
for (const file of ['modules.html', 'resources.html']) {
  const source = readFileSync(file,'utf8').split('<!-- FOOTER')[0];
  const headings = [...source.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)];
  headings.forEach((h,i) => {
    const block = source.slice(h.index, headings[i+1]?.index || source.length);
    const links = [...block.matchAll(/href="(https:\/\/docs\.oracle\.com\/[^"<>]+)"/g)].map(x=>x[1]);
    records.push({title:clean(h[1]), text:clean(block).slice(0,1800), url:'/'+file, links:[...new Set(links)].slice(0,3)});
  });
}
writeFileSync('assets/copilot-data.json',JSON.stringify(records));
writeFileSync('netlify/functions/_knowledge.json',JSON.stringify(records));
mkdirSync('dist',{recursive:true});
for(const f of readdirSync('.')) if(f.endsWith('.html')) cpSync(f,'dist/'+f);
for(const d of ['assets','xml-library']) cpSync(d,'dist/'+d,{recursive:true});
console.log(`Built public site with ${records.length} reference sections.`);
