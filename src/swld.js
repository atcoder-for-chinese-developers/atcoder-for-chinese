navigator.serviceWorker.register(`src/sw.js?time=${new Date().getTime()}`).then(async reg => {
    window.location.search = `?time=${new Date().getTime()}`
}).catch(err => { console.error(err); return; })