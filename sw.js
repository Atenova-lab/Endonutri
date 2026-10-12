/* Caché de recursos educativos públicos. No intercepta Supabase ni datos de pacientes. */
'use strict';
const VERSION = '20261012-juegos-1';
const PREFIX = 'endonutri-public-';
const CACHE = PREFIX + VERSION;
const ROOT = new URL('./', self.registration.scope);
const CORE = [
  './', 'index.html', 'offline.html', 'manifest.webmanifest',
  'config.js', 'app.js', 'app-core.js', 'contenidos.js', 'cuestionario.js',
  'papef.js', 'macronutrientes.js', 'equivalencias-datos.js', 'equivalencias.js',
  'navegacion-visual.js', 'buscador.js', 'pwa.js', 'qr.js',
  'juegos-data.js', 'juegos-core.js', 'juegos.js', 'juegos.css', 'img/juegos.svg',
  'style.css', 'papef.css', 'macronutrientes.css', 'equivalencias.css',
  'navegacion-visual.css', 'fondo-inicio.css', 'pwa.css',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png',
  'img/hero-endonutri.webp', 'img/tarjetas/herramientas-plato.webp',
  'img/tarjetas/obesidad-que-es.webp', 'img/tarjetas/ejercicio-empezar.webp',
  'img/tarjetas/equivalencias.webp', 'img/tarjetas/medicacion-glp1.webp',
  'img/tarjetas/cuestionario-main.webp'
];
const CORE_PATHS = new Set(CORE.map(path => new URL(path, ROOT).pathname));
const MAX_ITEMS = 140;
const MAX_FILE_BYTES = 12 * 1024 * 1024;
function publicURL(url) {
  if (url.origin !== ROOT.origin || !url.pathname.startsWith(ROOT.pathname)) return false;
  const path = url.pathname.slice(ROOT.pathname.length);
  if (CORE_PATHS.has(url.pathname)) return true;
  if (path.startsWith('img/') && /\.(png|jpe?g|webp|svg)$/i.test(path)) return true;
  if (path.startsWith('icons/') && /\.(png|svg)$/i.test(path)) return true;
  if (path.startsWith('guias/') && /\.(html|css)$/i.test(path)) return true;
  if (/^pdfs\/(planes-calorias|situaciones-especiales|rutinas|estoma|movilidad-reducida)\//.test(path) && /\.pdf$/i.test(path)) return true;
  return path === 'pdfs/cuestionario-imprimible.pdf' || path === 'cuestionario-imprimible.pdf';
}
function cacheKey(url) {
  const key = new URL(url);
  key.search = ''; key.hash = '';
  return key.href;
}
function cacheable(response, url) {
  if (!response.ok || response.status === 206 || response.type === 'opaque') return false;
  if (response.headers.get('Cache-Control')?.includes('no-store')) return false;
  const actual = response.url ? new URL(response.url) : url;
  if (actual.origin !== url.origin || actual.pathname !== url.pathname) return false;
  const bytes = Number(response.headers.get('Content-Length') || 0);
  return bytes <= MAX_FILE_BYTES;
}
async function remember(request, response) {
  const url = new URL(request.url);
  if (!cacheable(response, url)) return;
  // Una copia local de los PDFs solo se guarda cuando se ha descargado completo.
  if (/\.pdf$/i.test(url.pathname) && (await response.clone().blob()).size > MAX_FILE_BYTES) return;
  const cache = await caches.open(CACHE);
  await cache.put(cacheKey(url), response.clone());
  const entries = await cache.keys();
  const extra = entries.filter(entry => !CORE_PATHS.has(new URL(entry.url).pathname));
  for (const entry of extra.slice(0, Math.max(0, entries.length - MAX_ITEMS))) await cache.delete(entry);
}
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await Promise.all(CORE.map(async path => {
      const url = new URL(path, ROOT);
      const response = await fetch(url.href, { cache: 'reload' });
      if (!cacheable(response, url)) throw new Error('Public app shell unavailable');
      await cache.put(url.href, response);
    }));
  })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(name => name.startsWith(PREFIX) && name !== CACHE).map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});
self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});
async function offlineResponse(request) {
  const cache = await caches.open(CACHE);
  const response = await cache.match(cacheKey(request.url));
  if (response) return response;
  if (request.mode === 'navigate') return await cache.match(new URL('offline.html', ROOT).href) ||
    new Response('Este recurso necesita conexión. Vuelve a Inicio.', { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  return new Response('', { status: 503 });
}
async function cachedRange(request) {
  const response = await (await caches.open(CACHE)).match(cacheKey(request.url));
  if (!response) return new Response('', { status: 503 });
  const data = await response.arrayBuffer(), size = data.byteLength;
  const range = /^bytes=(\d*)-(\d*)$/.exec(request.headers.get('Range') || '');
  if (!range || (!range[1] && !range[2])) return new Response('', { status: 416, headers: { 'Content-Range': 'bytes */' + size } });
  const start = range[1] ? Number(range[1]) : Math.max(0, size - Number(range[2]));
  const end = range[1] && range[2] ? Math.min(size - 1, Number(range[2])) : size - 1;
  if (start >= size || start > end) return new Response('', { status: 416, headers: { 'Content-Range': 'bytes */' + size } });
  return new Response(data.slice(start, end + 1), { status: 206, headers: {
    'Content-Type': response.headers.get('Content-Type') || 'application/pdf',
    'Content-Range': 'bytes ' + start + '-' + end + '/' + size,
    'Content-Length': String(end - start + 1), 'Accept-Ranges': 'bytes'
  } });
}
self.addEventListener('fetch', event => {
  const request = event.request, url = new URL(request.url);
  if (request.method !== 'GET' || !publicURL(url)) return;
  // No se guarda una URL que pueda contener parámetros de recuperación o datos.
  if ([...url.searchParams.keys()].some(key => key !== 'v')) return;
  if (request.headers.has('Range')) {
    if (/\.pdf$/i.test(url.pathname)) event.respondWith(fetch(request).catch(() => cachedRange(request)));
    return;
  }
  const network = fetch(request).then(async response => {
    if (response.ok) event.waitUntil(remember(request, response).catch(() => {}));
    else if (response.status >= 500) {
      const cached = await (await caches.open(CACHE)).match(cacheKey(url));
      if (cached) return cached;
    }
    return response;
  });
  // El contenido actual tiene prioridad. Con red bloqueada, se usa lo guardado.
  const quick = new Promise(resolve => setTimeout(() => resolve(null), 4000));
  event.waitUntil(network.catch(() => {}));
  event.respondWith((async () => {
    try {
      const response = await Promise.race([network, quick]);
      if (response) return response;
      const cached = await (await caches.open(CACHE)).match(cacheKey(url));
      return cached || await network;
    } catch (_) { return offlineResponse(request); }
  })());
});
