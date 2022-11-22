import { PROXY_CONFIG } from './composables/api/api.config'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
    css: ["@/assets/css/tailwind.css"],
    // typescript: { typeCheck: true, strict: true },
    buildModules: [
        '@pinia/nuxt',
    ],
    build: {
        postcss: {
            postcssOptions: require("./postcss.config.js"),
        },
        transpile: ['gsap'],
    },
    vite: {
        server: {
            //@ts-ignore
            proxy: PROXY_CONFIG
            // proxy: {
            //     '/api': 'https://acm.academyland.net/'
            // }
        }
    }
})
