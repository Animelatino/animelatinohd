const nextConfig = {
    async headers() {
        return [{
            source: "/(.*)",
            headers: [
                {
                    key: 'X-Frame-Options',
                    value: 'DENY',
                }
            ]
        }];
    },
    images: {
        domains: ['i.imgur.com','*.tmdb.org','www.themoviedb.org'],
        deviceSizes: [40, 53, 140, 162, 182, 192, 236, 250, 280],
        imageSizes: [40, 53, 140, 162, 182, 192, 236, 250, 280],
    },
    env: {
        NAME: 'AnimeLHD',
        URL: 'https://www.animelatinohd.com',
        APIURL: 'https://api.animelatinohd.com/api/',
        STREAMURL: 'https://api.animelatinohd.com/stream/',
        GA_TRACKING_ID: 'UA-162278791-1',
        DISQUS_SHORTNAME: 'animelatinohd'
    }
}

module.exports = nextConfig
