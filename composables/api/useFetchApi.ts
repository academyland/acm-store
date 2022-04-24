import { FetchOptions } from "ohmyfetch"

export const useFetchApi = () => {
    const myCustomFetch = (url: string, config: FetchOptions) => {
        config = { baseURL: 'https://acm.academyland.net/api/web', ...config }
        return $fetch(url, config)
    }
    return myCustomFetch
}