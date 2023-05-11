export const isProd = process.env.NODE_ENV === 'production'
export const BASE_URL = isProd ? 'https://acm.academyland.net/api/web' : 'http://' + 'localhost:3000/service'
export const PROXY_CONFIG = isProd ? {} : {
    '/service': {
        target: 'https://acm.academyland.net/api/web', changeOrigin: true, pathRewrite: {
            '^/service': ''
        }
    }
}
export const CLIENT_ID = 'fkgrr3w3@gdgdjk'
export const CLIENT_SECRET = 'ghgkhgh@bfb,fbfgfgasd'
