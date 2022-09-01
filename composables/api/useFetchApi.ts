import { ClassConstructor, plainToInstance, instanceToPlain } from "class-transformer"
import { FetchError, FetchOptions } from "ohmyfetch"
import { useAuthStore } from "../auth/Auth.store"
import { BASE_URL } from "./api.config"
import { FetchCustomConfig } from "./FetchCustomConfig.interface"
import "reflect-metadata"
export const useFetchApi = <R, T = {}>(classTransformer: ClassConstructor<T> = null as unknown as ClassConstructor<T>) => {
    const router = useRouter();
    const myCustomFetch = (url: string, config: FetchOptions, customConfig: FetchCustomConfig = {}) => {
        config = { baseURL: BASE_URL, retry: 0, ...config }
        customConfig = { goToLogin: true, ...customConfig }
        const authStore = useAuthStore();
        if (customConfig.setToken) {
            if (!config.headers) {
                config.headers = {}
            }
            config.headers['Authorization'] = `Bearer ${authStore.getToken}`
        }
        return $fetch<R>(url, config).then((response) => {
            if (classTransformer != null) {
                return instanceToPlain(plainToInstance(classTransformer, response, { excludeExtraneousValues: true })) as unknown as R
            }
            return response
        }).catch((e) => {
            customConfig.onError?.(e)
            if (customConfig.ignoreErrors) {
                return;
            }

            const { clearStore } = useAuthStore()
            if (e.response && e.response.status === 401) {
                return handleRefreshToken(e, url, config, customConfig)?.catch((e) => {
                    console.error("error in refresh", e)
                    clearStore();
                    goToLoginIfYouShould(customConfig);
                }) as unknown as R;

            }
        })
    }
    function goToLoginIfYouShould(fetchCustomConfig: FetchCustomConfig) {
        if (fetchCustomConfig.goToLogin != false) {
            router.replace("/auth");
        }
    }


    async function handleRefreshToken(e: FetchError, url: string, config: FetchOptions, customConfig: FetchCustomConfig) {
        const authStore = useAuthStore();
        if (!authStore.isLoggedIn) {
            console.error("send request that needs token while user is not logged in : ", url)
            return new Promise((_, reject) => {
                reject(e);
            })
        }
        if (!authStore.isRefreshing && !authStore.isRefreshSuccess) {
            authStore.doRefreshToken();
        }

        return new Promise((resolve, reject) => {
            if (authStore.isRefreshSuccess) {
                resolve(myCustomFetch(url, config, customConfig))
            } else {
                watch(() => authStore.isRefreshing, (isRefreshing) => {
                    if (isRefreshing == false) {
                        console.log(" authStore.isRefreshSuccess", authStore.isRefreshSuccess, config.params)
                        if (authStore.isRefreshSuccess) {
                            resolve(myCustomFetch(url, config, customConfig))
                        } else {
                            reject(e)
                        }
                    }
                })
            }

        })
    }
    return myCustomFetch
}