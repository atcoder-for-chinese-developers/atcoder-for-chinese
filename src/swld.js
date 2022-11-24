navigator.serviceWorker.register(`src/sw.js?time=${new Date().getTime()}`).then(async reg => {
    if (window.localStorage.getItem('swinstall') != 'true') {
        window.localStorage.setItem('swinstall', 'true');
        window.location.search = `?time=${new Date().getTime()}`
    }

}).catch(err => { console.error(err); return; })