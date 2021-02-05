const withPlugins = require('next-compose-plugins')
const withImages = require('next-images')

const nextConfig = {
    images: {
        domains: ['i.imgur.com','*.tmdb.org','www.themoviedb.org']
    }
}

module.exports = withPlugins([[withImages]], nextConfig)