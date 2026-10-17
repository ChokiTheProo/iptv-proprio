// Testa canais da playlist - verifica se URL responde e se é HLS válido
// Uso: node scripts/test-channels.mjs [br|filmes] [limite]
// Ex: node scripts/test-channels.mjs br 50
import { readFile, writeFile } from 'node:fs/promises';

const file = process.argv[2] || 'br';
const limit = parseInt(process.argv[3] || '0', 10);
const path = `player/playlists/${file}.m3u`;

function parseM3U(text){
  const lines = text.split(/\r?\n/);
  const out=[];
  let cur=null;
  for(const raw of lines){
    const l=raw.trim();
    if(!l) continue;
    if(l.startsWith('#EXTINF')){
      const name = l.split(',').slice(1).join(',').trim() || 'Sem nome';
      const group=(l.match(/group-title="([^"]*)"/)||[])[1]||'';
      cur={name, group, raw:l, url:''};
    } else if(l.startsWith('http')){
      if(cur){ cur.url=l; out.push(cur); cur=null; }
    }
  }
  return out;
}

async function testOne(ch, timeoutMs=7000){
  const controller = new AbortController();
  const t = setTimeout(()=>controller.abort(), timeoutMs);
  const start=Date.now();
  try{
    // tenta HEAD primeiro, fallback GET primeiros bytes
    let res = await fetch(ch.url, { method:'HEAD', signal:controller.signal, redirect:'follow' });
    if(!res.ok || res.status===405 || res.status===501){
      res = await fetch(ch.url, { method:'GET', headers:{Range:'bytes=0-2047'}, signal:controller.signal, redirect:'follow' });
    }
    clearTimeout(t);
    const ms=Date.now()-start;
    const ct = res.headers.get('content-type')||'';
    let bodyHint='';
    if(res.ok){
      try{
        const txt = await res.text();
        if(txt.includes('#EXTM3U')) bodyHint='HLS OK';
        else if(txt.includes('#EXT')) bodyHint='HLS parcial';
        else if(ct.includes('mpegURL')||ct.includes('x-mpegURL')) bodyHint='HLS ct';
        else bodyHint=txt.slice(0,120).replace(/\n/g,' ').trim();
      }catch{}
    }
    return { url:ch.url, name:ch.name, group:ch.group, ok:res.ok, status:res.status, ms, ct, hint:bodyHint };
  } catch(e){
    clearTimeout(t);
    return { url:ch.url, name:ch.name, group:ch.group, ok:false, status:0, ms:Date.now()-start, ct:'', hint: e.name==='AbortError' ? 'timeout' : e.message.slice(0,120) };
  }
}

async function main(){
  const text = await readFile(path,'utf8');
  let chans = parseM3U(text);
  if(limit>0) chans = chans.slice(0, limit);
  console.log(`\n=== Testando ${chans.length} canais de ${file}.m3u (${text.length/1024|0} KB) ===`);
  console.log(`Timeout 7s por canal, testando em paralelo (10 por vez)...\n`);

  const results=[];
  const conc=10;
  for(let i=0;i<chans.length;i+=conc){
    const batch = chans.slice(i,i+conc);
    const r = await Promise.all(batch.map(c=>testOne(c)));
    r.forEach(x=>{
      const icon = x.ok ? '✅' : '❌';
      const extra = x.ok ? `(${x.status} ${x.ms}ms ${x.ct||''} ${x.hint})` : `(${x.hint||x.status} ${x.ms}ms)`;
      console.log(`${icon} ${x.name.slice(0,55).padEnd(55)} ${extra}`);
    });
    results.push(...r);
  }

  const ok = results.filter(r=>r.ok);
  const fail = results.filter(r=>!r.ok);
  console.log(`\n--- RESUMO ---`);
  console.log(`✅ Online: ${ok.length}/${results.length} (${(ok.length/results.length*100).toFixed(1)}%)`);
  console.log(`❌ Offline/timeout: ${fail.length}`);
  if(ok.length){
    console.log(`\nTop rápidos (online):`);
    ok.sort((a,b)=>a.ms-b.ms).slice(0,10).forEach(r=>console.log(`  ${r.ms}ms - ${r.name} - ${r.url}`));
  }
  if(fail.length){
    console.log(`\nExemplos offline:`);
    fail.slice(0,10).forEach(r=>console.log(`  ${r.name} - ${r.url} -> ${r.hint}`));
  }

  // salva json e também uma playlist só com os online
  await writeFile(`player/playlists/${file}-test.json`, JSON.stringify({ testedAt: new Date().toISOString(), total: results.length, online: ok.length, results },null,2),'utf8');
  const onlineM3U = ['#EXTM3U', ...ok.flatMap(r=>{
    // recuperar linha original
    const orig = chans.find(c=>c.url===r.url);
    return [orig.raw, r.url];
  })].join('\n');
  await writeFile(`player/playlists/${file}-online.m3u`, onlineM3U, 'utf8');
  console.log(`\nSalvo: player/playlists/${file}-test.json e ${file}-online.m3u (${ok.length} canais)`);
  console.log(`Use o arquivo *-online.m3u no Kodi/TiviMate/SS IPTV para só canais testados.`);
}
main().catch(e=>{ console.error(e); process.exit(1); });
