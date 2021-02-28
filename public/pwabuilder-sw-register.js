if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/pwabuilder-sw.js', {
        scope: '.'
    }).then(function (registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function (err) {
        console.log('ServiceWorker registration failed: ', err);
    });
}