const withPlugins = require('next-compose-plugins')
const withImages = require('next-images')

const nextConfig = {
    images: {
        domains: ['i.imgur.com','image.tmdb.org']
    },
    env: {
        homePage: 'https://animelatinohd.com',
        apiPage: 'https://api.animelatinohd.com/api',
    },
}

module.exports = withPlugins([[withImages]], nextConfig)