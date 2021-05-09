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
        NAME: process.env.NAME,
        URL: process.env.URL,
        APIURL: process.env.APIURL,
        STREAMURL: process.env.STREAMURL,
        GA_TRACKING_ID: process.env.GA_TRACKING_ID,
        DISQUS_SHORTNAME: process.env.DISQUS_SHORTNAME,
        APIKEY: process.env.APIKEY
    }
}

module.exports = nextConfig
