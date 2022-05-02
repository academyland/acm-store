import { ClassConstructor, plainToClass } from "class-transformer"
import { FetchOptions } from "ohmyfetch"
import { BASE_URL } from "./api.config"

export const useFetchApi = <T>(classTransformer: ClassConstructor<T> = null) => {
    const myCustomFetch = (url: string, config: FetchOptions) => {
        config = { baseURL: BASE_URL, ...config }
        return $fetch(url, config).then((response) => {
            if (classTransformer != null) {
                return plainToClass(classTransformer, response, { excludeExtraneousValues: true })
            }
            return response
        })
    }
    return myCustomFetch
}