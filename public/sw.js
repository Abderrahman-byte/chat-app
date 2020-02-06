const cacheName = 'v3.1.4';

// Call install event
self.addEventListener('install', e => {
    console.log('installed')

    e.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            cache.addAll(['/', '/index.html'])
        })
        .then(() => self.skipWaiting())
        .catch(err => console.log(err))
    )
});

// Call activate event 
self.addEventListener('activate', e => {
    console.log('activated')

    e.waitUntil(
        caches.keys()
        .then(keys => {
            return Promise.all(
                keys.filter(key => key !== cacheName)
                .map(cache => caches.delete(cache)) 
            )
        })
        .then(() => self.skipWaiting())
        .catch(err => console.error(err))
    )
})

// Handle fetch event
self.addEventListener('fetch', e => {
    //chrome-extension
    if(e.request.url.indexOf('https://firestore.googleapis.com') === -1 && 
    e.request.url.indexOf('chrome-extension') === -1) {
        e.respondWith(
            caches.match(e.request)
            .then(cacheRes => {
                return cacheRes || fetch(e.request)
                .then(res => {
                    const resClone = res.clone();

                    caches.open(cacheName)
                    .then(cache => {
                        if(e.request.method !== 'POST') {
                            cache.put(e.request, resClone)
                        }
                    }).catch(err => console.log(err))

                    return res;
                })

            })

        )
    }
})

