import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.API_URL,
    timeout: 10000,
    headers: {
        key: process.env.API_KEY,
    },
});
