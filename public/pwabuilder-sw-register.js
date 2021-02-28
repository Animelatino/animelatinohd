if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/pwabuilder-sw.js', {
        scope: '.'
    }).then(function (registration) {
        console.log('This serviceWorker registration successful with scope: ', registration.scope);
    }, function (err) {
        console.log('This serviceWorker registration failed: ', err);
    });
}