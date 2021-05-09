import axios from 'axios'

export const api = axios.create({
    baseURL: process.env.APIURL,
    timeout: 10000,
    headers: {
        key: process.env.APIKEY
    }
})