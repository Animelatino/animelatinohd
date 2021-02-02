const withPlugins = require('next-compose-plugins')
const withImages = require('next-images')

const nextConfig = {
    images: {
        domains: ['i.imgur.com','*.tmdb.org','www.themoviedb.org']
    },
    env: {
        NAME: 'AnimeLHD',
        URL: 'https://www.animelatinohd.com/',
        APIURL: 'http://apijson.test/api/',
        STREAMURL: 'http://apijson.test/stream/',
        GA_TRACKING_ID: 'UA-162278791-1',
        DISQUS_SHORTNAME: 'animelatinohd'
    },
}

module.exports = withPlugins([[withImages]], nextConfig)