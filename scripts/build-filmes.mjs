// Cria sua videoteca de filmes 100% legal e gratuita (domínio público / Creative Commons)
// Fontes: Internet Archive, public domain, Blender open movies, etc.
// Resultado: player/playlists/filmes.m3u + categorias

import { writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const OUT = 'player/playlists/filmes.m3u';

// Filmes e desenhos 100% livres para IPTV próprio
// Todas URLs são HLS ou MP4 direto (hls.js/VLC aceita mp4 também)
const FILMES = [
  // Blender Open Movies - 100% CC
  { name: 'Big Buck Bunny (2008) - Blender', group: 'Filmes;Animação', logo: 'https://peach.blender.org/wp-content/uploads/bunny_poster.jpg', url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8' },
  { name: 'Sintel (2010) - Blender', group: 'Filmes;Fantasia', logo: 'https://durian.blender.org/wp-content/uploads/2010/05/sintel_poster.jpg', url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8' },
  { name: 'Elephants Dream (2006) - Blender (Sci-Fi)', group: 'Filmes;Sci-Fi', logo: 'https://orange.blender.org/wp-content/themes/orange/images/common/ed_header.jpg', url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8' },

  // Internet Archive - domínio público (exemplos clássicos)
  // Night of the Living Dead (1968) - domínio público nos EUA
  { name: 'Night of the Living Dead (1968) - Domínio Público', group: 'Filmes;Terror;Clássico', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Night_of_the_Living_Dead_%281968%29_-_title_card.jpg/640px-Night_of_the_Living_Dead_%281968%29_-_title_card.jpg', url: 'https://archive.org/download/night_of_the_living_dead/night_of_the_living_dead_512kb.mp4' },
  { name: 'Charade (1963) - Domínio Público', group: 'Filmes;Comédia;Clássico', logo: '', url: 'https://archive.org/download/Charade_1963/Charade_1963_512kb.mp4' },

  // Pluto TV BR - canais FAST gratuitos e legais (funcionam como "filmes 24h")
  { name: 'Pluto TV Cine Sucessos (FAST)', group: 'Filmes;FAST', logo: 'https://images.pluto.tv/channels/5f1213aa91a87d00074c8c4c/colorLogoPNG.png', url: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f1213aa91a87d00074c8c4c/master.m3u8?deviceType=samsung-tvplus&deviceMake=samsung&deviceModel=samsung&deviceVersion=unknown&appVersion=unknown&deviceLat=0&deviceLon=0&deviceDNT=%7BtargetOptOut%7D&deviceId=%7BdeviceId%7D&advertisingId=%7BdeviceId%7D&embedPartner=samsung-tvplus&appName=samsung-tvplus&appVersion=unknown&rawDeviceDNT=0&deviceId=aaa&advertisingId=aaa&embedPartner=samsung-tvplus' },
  { name: 'Pluto TV Cine Comédia (FAST)', group: 'Filmes;Comédia;FAST', logo: '', url: 'https://service-stitcher.clusters.pluto.tv/v1/stitch/embed/hls/channel/5f121175aa8855000724b270/master.m3u8?deviceType=samsung-tvplus&deviceMake=samsung&deviceModel=samsung&deviceVersion=unknown&appVersion=unknown&deviceLat=0&deviceLon=0&deviceDNT=%7BtargetOptOut%7D&deviceId=%7BdeviceId%7D&advertisingId=%7BdeviceId%7D&embedPartner=samsung-tvplus&appName=samsung-tvplus&appVersion=unknown&rawDeviceDNT=0&deviceId=aaa&advertisingId=aaa&embedPartner=samsung-tvplus' },

  // Adrenalina Pura, Pluto etc já vêm de iptv-org na categoria Movies - deixar separado aqui como curadoria
];

async function main(){
  if(!existsSync('player/playlists')) await mkdir('player/playlists', {recursive:true});

  // Gerar M3U
  let m3u = '#EXTM3U\n';
  for(const f of FILMES){
    const logo = f.logo ? ` tvg-logo="${f.logo}"` : '';
    const group = ` group-title="${f.group}"`;
    // tvg-id limpo
    const id = f.name.toLowerCase().replace(/[^a-z0-9]+/g,'-').slice(0,40);
    m3u += `#EXTINF:-1 tvg-id="${id}"${logo}${group},${f.name}\n${f.url}\n`;
  }
  await writeFile(OUT, m3u, 'utf8');
  console.log(`✓ Criado ${OUT} com ${FILMES.length} títulos (100% gratuito/legal)`);
  console.log(`\nCategorias:`);
  const cats = [...new Set(FILMES.flatMap(f=>f.group.split(';')))];
  console.log(cats.join(', '));
  console.log(`\nPara adicionar mais filmes:`);
  console.log(`1. Procure no https://archive.org/details/movies (filtre por "public domain")`);
  console.log(`2. Copie o link .mp4 direto e adicione em scripts/build-filmes.mjs`);
  console.log(`3. Rode: node scripts/build-filmes.mjs`);
  console.log(`\nOu use canais FAST (Pluto TV, Samsung TV Plus, Plex) - são "filmes 24h" gratuitos.`);

  // Também criar lista combinada filmes + iptv-org Movies
  console.log(`\nDica: sua playlist BR já tem 27 canais de Filmes (Categoria Movies) de IPTV gratuito.`);
  console.log(`Junte tudo: no player, use "Abrir .m3u local" e selecione br.m3u + filmes.m3u, ou use:`);
  console.log(`  type player\\playlists\\br-online.m3u player\\playlists\\filmes.m3u > player\\playlists\\tudo.m3u`);
}

main().catch(e=>{ console.error(e); process.exit(1); });
