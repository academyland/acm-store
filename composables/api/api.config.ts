export const isProd = process.env.NODE_ENV === 'production'
export const BASE_URL = isProd ? 'https://acm.academyland.net/api/web' : 'http://' + 'localhost:3000/api/web'
export const PROXY_CONFIG = isProd ? {} : {
    '/api': 'https://acm.academyland.net/'
}
