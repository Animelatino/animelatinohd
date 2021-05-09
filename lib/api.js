import axios from 'axios'

export const api = axios.create({
    baseURL: process.env.APIURL,
    timeout: 10000,
    params: {
        key: 'key_cur_prod_fnPqT5xQEi5Vcb9wKwbCf65c3BjVGyBB'
   }
})