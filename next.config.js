const withPWA = require('next-pwa')

const nextConfig = {
    mode: 'production',
    pwa: {
        dest: 'public',
        register: true,
        scope: '/',
        sw: 'service-worker.js',
        importScripts: ["https://arc.io/arc-sw-core.js"],
        offlineGoogleAnalytics: false
    },
    images: {
        domains: ['i.imgur.com','*.tmdb.org','www.themoviedb.org'],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },
    env: {
        NAME: 'AnimeLHD',
        URL: 'http://www.animelatinohd.com',
        APIURL: 'https://api.animelatinohd.com/api/',
        STREAMURL: 'https://api.animelatinohd.com/stream/',
        GA_TRACKING_ID: 'UA-162278791-1',
        DISQUS_SHORTNAME: 'animelatinohd'
    }
}

module.exports = withPWA(nextConfig)