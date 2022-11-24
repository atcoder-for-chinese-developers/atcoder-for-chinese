//d0j1a_1701 IntelligentCache&CDN sw.js Ver 1.5
const CACHE_NAME = 'd0j1a1701Cache';
let cachelist = [], whitelist = ['localhost', 'api.d0j1a1701.cc'];
self.addEventListener('install', async function (installEvent) {
    self.skipWaiting();
    console.info('[Service Worker] Service Worker加载成功');
    installEvent.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.info('[Service Worker] 缓存已加载');
                return cache.addAll(cachelist);
            })
    );
});
self.addEventListener('fetch', async event => {
    try {
        event.respondWith(handle(event.request))
    } catch (msg) {
        event.respondWith(handleerr(event.request, msg))
    }
});
const handleerr = async (req, msg) => {
    return new Response(`<h1>Service Worker遇到了致命错误</h1><b>${msg}</b>`, { headers: { "content-type": "text/html; charset=utf-8" } })
}
let cdn = {
    "gh": {
        jsdelivr: {
            "url": "https://cdn.jsdelivr.net/gh"
        },
        jsdelivr_fastly: {
            "url": "https://fastly.jsdelivr.net/gh"
        },
        jsdelivr_gcore: {
            "url": "https://gcore.jsdelivr.net/gh"
        },
        tianli: {
            "url": "https://cdn1.tianli0.top/gh"
        },
        d0j1a1701: {
            "url": "https://cdn.d0j1a1701.cc/gh"
        }
    },
    "combine": {
        jsdelivr: {
            "url": "https://cdn.jsdelivr.net/combine"
        },
        jsdelivr_fastly: {
            "url": "https://fastly.jsdelivr.net/combine"
        },
        jsdelivr_gcore: {
            "url": "https://gcore.jsdelivr.net/combine"
        },
        d0j1a1701: {
            "url": "https://cdn.d0j1a1701.cc/combine"
        }
    },
    "npm": {
        eleme: {
            "url": "https://npm.elemecdn.com"
        },
        jsdelivr: {
            "url": "https://cdn.jsdelivr.net/npm"
        },
        zhimg: {
            "url": "https://unpkg.zhimg.com"
        },
        unpkg: {
            "url": "https://unpkg.com"
        },
        bdstatic: {
            "url": "https://code.bdstatic.com/npm"
        },
        tianli: {
            "url": "https://cdn1.tianli0.top/npm"
        },
        sourcegcdn: {
            "url": "https://npm.sourcegcdn.com/npm"
        },
        d0j1a1701: {
            "url": "https://cdn.d0j1a1701.cc/npm"
        }
    }
}
const fetchFromCache = function (req) {
    return new Promise(resolve => {
        if (req.method == 'POST') {
            resolve(fetch(req));
            return;
        }
        let url = new URL(req.url), hostname = url.hostname;
        if (whitelist.indexOf(hostname) != -1) {
            resolve(fetch(req));
            return;
        }
        setTimeout(async () => {
            caches.match(req).then(function (resp) {
                if (resp) {
                    resolve(resp);
                    fetch(req).then(function (res) {
                        return caches.open(CACHE_NAME).then(function (cache) {
                            cache.delete(req);
                            cache.put(req, res.clone());
                            return res;
                        });
                    });
                } else {
                    resolve(fetch(req).then(function (res) {
                        return caches.open(CACHE_NAME).then(function (cache) {
                            cache.delete(req);
                            cache.put(req, res.clone());
                            return res;
                        });
                    }));
                }
            })
        }, 0)
    });
}
const handle = async function (req) {
    const urlStr = req.url
    const domain = (urlStr.split('/'))[2]
    let urls = []
    //IntelligentCDN CDN分流器
    for (let i in cdn) {
        for (let j in cdn[i]) {
            if (domain == cdn[i][j].url.split('https://')[1].split('/')[0] && urlStr.match(cdn[i][j].url)) {
                urls = []
                for (let k in cdn[i]) {
                    urls.push(urlStr.replace(cdn[i][j].url, cdn[i][k].url))
                }
                if (urlStr.indexOf('@latest/') > -1) {
                    return lfetch(urls, urlStr)
                } else {
                    return caches.match(req).then(function (resp) {
                        return resp || lfetch(urls, urlStr).then(function (res) {
                            return caches.open(CACHE_NAME).then(function (cache) {
                                cache.put(req, res.clone());
                                return res;
                            });
                        });
                    })
                }
            }
        }
    }
    //IntelligentCache
    return fetchFromCache(req)
}
const lfetch = async (urls, url) => {
    let controller = new AbortController();
    const PauseProgress = async (res) => {
        return new Response(await (res).arrayBuffer(), { status: res.status, headers: res.headers });
    };
    if (!Promise.any) {
        Promise.any = function (promises) {
            return new Promise((resolve, reject) => {
                promises = Array.isArray(promises) ? promises : []
                let len = promises.length
                let errs = []
                if (len === 0) return reject(new AggregateError('All promises were rejected'))
                promises.forEach((promise) => {
                    promise.then(value => {
                        resolve(value)
                    }, err => {
                        len--
                        errs.push(err)
                        if (len === 0) {
                            reject(new AggregateError(errs))
                        }
                    })
                })
            })
        }
    }
    return Promise.any(urls.map(urls => {
        return new Promise((resolve, reject) => {
            fetch(urls, {
                signal: controller.signal
            })
                .then(PauseProgress)
                .then(res => {
                    if (res.status == 200) {
                        controller.abort();
                        resolve(res)
                    } else {
                        reject(res)
                    }
                }).catch(err => { })
        })
    }))
}
