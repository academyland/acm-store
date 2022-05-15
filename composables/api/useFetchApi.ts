import { ClassConstructor, plainToInstance, instanceToPlain } from "class-transformer"
import { FetchOptions } from "ohmyfetch"
import { BASE_URL } from "./api.config"

export const useFetchApi = <T, R>(classTransformer: ClassConstructor<T> = null as unknown as ClassConstructor<T>) => {
    const myCustomFetch = (url: string, config: FetchOptions) => {
        config = { baseURL: BASE_URL, ...config }
        return $fetch<R>(url, config).then((response) => {
            if (classTransformer != null) {
                return instanceToPlain(plainToInstance(classTransformer, response, { excludeExtraneousValues: true })) as unknown as R
            }
            return response
        })
    }
    return myCustomFetch
}