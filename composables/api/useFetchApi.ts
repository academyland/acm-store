import { ClassConstructor, plainToInstance, instanceToPlain } from "class-transformer"
import { FetchOptions } from "ohmyfetch"
import { BASE_URL } from "./api.config"
import { FetchCustomConfig } from "./FetchCustomConfig.interface"

export const useFetchApi = <T, R>(classTransformer: ClassConstructor<T> = null as unknown as ClassConstructor<T>) => {
    const myCustomFetch = (url: string, config: FetchOptions, customConfig: FetchCustomConfig = {}) => {
        config = { baseURL: BASE_URL, ...config }
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