const withPlugins = require('next-compose-plugins')
const withImages = require('next-images')

const nextConfig = {
    images: {
        domains: ['i.imgur.com','image.tmdb.org']
    },
    env: {
        SITENAME: 'AnimeLHD',
        URLPAGE: 'https://www.animelatinohd.com',
        APIPAGE: 'https://api.animelatinohd.com/api',
        STREAMPAGE: 'https://api.animelatinohd.com/stream',
        GA_TRACKING_ID: 'UA-162278791-1',
        DISQUS_SHORTNAME: 'animelatinohd'
    },
}

module.exports = withPlugins([[withImages]], nextConfig)