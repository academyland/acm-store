import { PROXY_CONFIG } from './composables/api/api.config'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
    css: ["@/assets/css/tailwind.css"],
    // typescript: { typeCheck: true, strict: true },
    modules: [
        '@pinia/nuxt',
    ],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    build: {
        transpile: ['gsap']
    },

    nitro: {
        devProxy: PROXY_CONFIG
    }
})
