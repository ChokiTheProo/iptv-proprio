// PWA offline básico - cacheia o player
const CACHE = 'iptv-v1';
const ASSETS = ['./', './index.html', './manifest.json'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  // cache-first para assets locais, network-first para .m3u externo
  if (e.request.url.includes('.m3u')) return;
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).catch(()=>r)));
});
