import { readFileSync, writeFileSync, mkdirSync, readdirSync, cpSync, existsSync } from 'node:fs';
function clean(s) { return s.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/&nbsp;/g,' ').replace(/&[a-z]+;/g,' ').replace(/\s+/g,' ').trim(); }
const records = [];

// 1. Module and documentation pages, split on <h3>.
for (const file of ['modules.html', 'resources.html']) {
  const source = readFileSync(file,'utf8').split('<!-- FOOTER')[0];
  const headings = [...source.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)];
  headings.forEach((h,i) => {
    const block = source.slice(h.index, headings[i+1]?.index || source.length);
    const links = [...block.matchAll(/href="(https:\/\/docs\.oracle\.com\/[^"<>]+)"/g)].map(x=>x[1]);
    records.push({title:clean(h[1]), text:clean(block).slice(0,1800), url:'/'+file, links:[...new Set(links)].slice(0,3)});
  });
}

// 2. Reference library documents, split on ## headings.
if (existsSync('reference-docs')) {
  for (const f of readdirSync('reference-docs').filter(f => f.endsWith('.md') && f !== 'README.md')) {
    const md = readFileSync('reference-docs/' + f, 'utf8');
    const docTitle = (md.match(/^#\s+(.+)$/m) || [,''])[1].trim() || f;
    const parts = md.split(/^(?=#{2,3}\s)/m);
    for (const part of parts) {
      const head = (part.match(/^#{2,3}\s+(.+)$/m) || [,''])[1].trim();
      const text = part.replace(/[#*`>|_-]+/g,' ').replace(/\s+/g,' ').trim();
      if (text.length < 60) continue;
      const links = [...part.matchAll(/(https:\/\/docs\.oracle\.com\/[^\s)>\]"]+)/g)].map(x=>x[1]);
      records.push({title: head ? `${docTitle}: ${head}` : docTitle, text: text.slice(0,1800), url: '/opera-doc.html?file=' + f, links:[...new Set(links)].slice(0,3)});
    }
  }
}

writeFileSync('assets/copilot-data.json',JSON.stringify(records));
writeFileSync('netlify/functions/_knowledge.json',JSON.stringify(records));
mkdirSync('dist',{recursive:true});
for(const f of readdirSync('.')) if(f.endsWith('.html') || f.endsWith('.zip') || f === 'robots.txt' || f === 'sitemap.xml') cpSync(f,'dist/'+f);
for(const d of ['assets','xml-library','reference-docs']) if (existsSync(d)) cpSync(d,'dist/'+d,{recursive:true});
console.log(`Built public site with ${records.length} reference sections.`);
