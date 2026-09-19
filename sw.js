/* Carnet de domaine — fonctionnement hors ligne.
   Incrémentez CACHE à chaque mise à jour des fichiers pour forcer le rafraîchissement. */
var CACHE = "carnet-domaine-v2";
var SHELL = [
  "./",
  "./index.html",
  "./plan.jpg",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable.png"
];

self.addEventListener("install", function(e){
  e.waitUntil(
    caches.open(CACHE).then(function(c){ return c.addAll(SHELL); }).then(function(){ return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(k){ return k === CACHE ? null : caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function(e){
  if(e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then(function(hit){
      if(hit) return hit;
      return fetch(e.request).then(function(res){
        /* On met en cache ce qui vient du site ; les polices Google sont opaques, on les ignore. */
        if(res && res.status === 200 && res.type === "basic"){
          var copy = res.clone();
          caches.open(CACHE).then(function(c){ c.put(e.request, copy); });
        }
        return res;
      }).catch(function(){
        /* Hors ligne et rien en cache : on renvoie la page d'accueil pour une navigation. */
        if(e.request.mode === "navigate") return caches.match("./index.html");
        return new Response("", {status:504, statusText:"hors ligne"});
      });
    })
  );
});
