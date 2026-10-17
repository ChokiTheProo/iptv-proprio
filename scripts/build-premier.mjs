import { readFile, writeFile } from 'node:fs/promises';

function parseM3U(text){
  const lines=text.split(/\r?\n/); const out=[]; let cur=null;
  for(const raw of lines){
    const l=raw.trim(); if(!l) continue;
    if(l.startsWith('#EXTINF')){ cur={raw:l, name:l.split(',').slice(1).join(',').trim(), group:(l.match(/group-title="([^"]*)"/)||[])[1]||'', url:''}; }
    else if(l.startsWith('http') && cur){ cur.url=l; out.push(cur); cur=null; }
  }
  return out;
}

const br = await readFile('player/playlists/br-online.m3u','utf8').catch(()=>readFile('player/playlists/br.m3u','utf8'));
let chans=parseM3U(br);

// PREMIER = só os melhores de Filmes/Movies + qualidade
const premierNames = [
  'Telecine','Paramount','Megapix','HBO','Cine','Prime Box','PobreFlix','Top Cine','Adrenalina Pura','AMC','AXN','Sony Movies','Filme'
];
let premier = chans.filter(c=> premierNames.some(n=>c.name.toLowerCase().includes(n.toLowerCase()) || c.group.toLowerCase().includes('movie')))
  .slice(0,12);
if(premier.length<6) premier = chans.filter(c=>c.group.toLowerCase().includes('movie')).slice(0,10);
if(premier.length<4) premier = chans.slice(0,8);

// força tag PREMIER no group
let m3u='#EXTM3U\n';
for(const c of premier){
  let raw=c.raw;
  if(!raw.includes('PREMIER')) raw=raw.replace(/group-title="([^"]*)"/, (m,g)=>`group-title="PREMIER;${g}"`);
  else raw=raw.replace('group-title="','group-title="PREMIER;');
  if(!raw.includes('🔥')) raw=raw.replace(/,\s*/, ',🔥 ');
  m3u+=raw+`\n${c.url}\n`;
}
await writeFile('player/playlists/premier.m3u', m3u, 'utf8');
console.log(`✓ premier.m3u criado com ${premier.length} canais PREMIER`);
premier.forEach(c=>console.log(' -',c.name));
