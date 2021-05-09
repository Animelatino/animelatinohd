import axios from 'axios'

export const api = axios.create({
    baseURL: process.env.APIURL,
    timeout: 10000,
    params: {
        key: process.env.APIKEY
    },
    headers: {
        Referer: process.env.URL
    }
})