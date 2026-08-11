const CACHE='training-tracker-v1.2.4';
const ASSETS=[
 './',
 './index.html',
 './styles.css?v=1.2.4',
 './pwa.css?v=1.2.4',
 './app.js?v=1.2.4',
 './machine-info.js?v=1.2.4',
 './manifest.webmanifest?v=1.2.4',
 './icons/icon.svg',
 './assets/machines/abdominal-crunch.webp',
 './assets/machines/cable-face-pull.webp',
 './assets/machines/calf-raise.webp',
 './assets/machines/chest-press.webp',
 './assets/machines/elliptical.webp',
 './assets/machines/hip-abductor.webp',
 './assets/machines/incline-chest-press.webp',
 './assets/machines/lat-pulldown.webp',
 './assets/machines/lateral-raise.webp',
 './assets/machines/leg-curl.webp',
 './assets/machines/leg-extension.webp',
 './assets/machines/leg-press.webp',
 './assets/machines/pec-deck.webp',
 './assets/machines/reverse-pec-deck.webp',
 './assets/machines/seated-row.webp',
 './assets/machines/shoulder-press.webp',
 './assets/machines/treadmill.webp'
];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>e.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))])));
self.addEventListener('message',e=>{if(e.data&&e.data.type==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put('./index.html',copy));return r}).catch(()=>caches.match('./index.html')));return}e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match(e.request)))})
