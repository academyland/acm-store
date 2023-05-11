import { isAuthRoute as isAuthHelper } from "~~/helpers/authHelper";

export const useAuthWrapper = () => {
    const route = useRoute();
    const isAuthRoute = computed(() => isAuthHelper(route.path))
    return {
        isAuthRoute,
    }
}