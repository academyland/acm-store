import { ClassConstructor, plainToInstance, instanceToPlain } from "class-transformer"
import { FetchOptions } from "ohmyfetch"
import { useAuthStore } from "../auth/Auth.store"
import { BASE_URL } from "./api.config"
import { FetchCustomConfig } from "./FetchCustomConfig.interface"
import "reflect-metadata"
export const useFetchApi = <R, T = {}>(classTransformer: ClassConstructor<T> = null as unknown as ClassConstructor<T>) => {
    const myCustomFetch = (url: string, config: FetchOptions, customConfig: FetchCustomConfig = {}) => {
        config = { baseURL: BASE_URL, ...config }
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

        })
    }
    return myCustomFetch
}