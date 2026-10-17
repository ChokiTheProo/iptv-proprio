// Baixa playlists públicas do iptv-org (apenas canais Free-To-Air)
// Uso: node scripts/fetch-playlist.mjs [br|all]  ou  npm run iptv:fetch
import { writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const OUT_DIR = 'player/playlists';

// URLs oficiais iptv-org (gh-pages)
const SOURCES = {
  br: 'https://iptv-org.github.io/iptv/countries/br.m3u',
  all: 'https://iptv-org.github.io/iptv/index.m3u',
  // fallback raw github
  br_fallback: 'https://raw.githubusercontent.com/iptv-org/iptv/gh-pages/countries/br.m3u',
};

async function fetchText(url) {
  console.log(`→ Baixando ${url} ...`);
  const res = await fetch(url, { headers: { 'User-Agent': 'IPTV-proprio/1.0' } });
  if (!res.ok) throw new Error(`HTTP ${res.status} em ${url}`);
  return await res.text();
}

async function main() {
  const arg = process.argv[2] || 'br';
  const url = SOURCES[arg] || SOURCES.br;
  const fallback = SOURCES.br_fallback;

  if (!existsSync(OUT_DIR)) await mkdir(OUT_DIR, { recursive: true });

  let text;
  try {
    text = await fetchText(url);
  } catch (e) {
    console.warn(`Falha em ${url}: ${e.message}, tentando fallback...`);
    text = await fetchText(fallback);
  }

  // Validação básica
  if (!text.includes('#EXTM3U')) throw new Error('Conteúdo não parece ser M3U válido');

  const count = (text.match(/#EXTINF/g) || []).length;
  const outFile = `${OUT_DIR}/${arg}.m3u`;
  await writeFile(outFile, text, 'utf8');
  console.log(`✓ Salvo ${count} canais em ${outFile} (${(text.length/1024).toFixed(1)} KB)`);
  console.log(`  Abra o player e use "Abrir .m3u local" ou mova para servir direto.`);
  console.log(`  Fonte: iptv-org/iptv (apenas canais públicos FTA)`);
}

main().catch(e => { console.error('Erro:', e.message); process.exit(1); });
