import { useAuthStore } from "~~/composables/auth/Auth.store"

export default defineNuxtPlugin(({ pinia }) => {
    const authStore = useAuthStore(pinia)
    authStore.initialStateFromLocalStore()
})