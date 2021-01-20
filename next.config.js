const withPlugins = require('next-compose-plugins')
const withImages = require('next-images')

const nextConfig = {
    images: {
        domains: ['i.imgur.com','*.tmdb.org','www.themoviedb.org']
    },
    env: {
        SITENAME: 'AnimeLHD',
        URLPAGE: 'https://www.animelatinohd.com',
        APIURL: 'https://api.animelatinohd.com/api/web/',
        STREAMURL: 'https://api.animelatinohd.com/stream/',
        GA_TRACKING_ID: 'UA-162278791-1',
        DISQUS_SHORTNAME: 'animelatinohd'
    },
}

module.exports = withPlugins([[withImages]], nextConfig)