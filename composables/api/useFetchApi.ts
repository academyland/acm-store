import { FetchOptions } from "ohmyfetch"
import { BASE_URL } from "./api.config"

export const useFetchApi = () => {
    const myCustomFetch = (url: string, config: FetchOptions) => {
        config = { baseURL: BASE_URL, ...config }
        return $fetch(url, config)
    }
    return myCustomFetch
}