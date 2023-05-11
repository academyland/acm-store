import { AuthRoutes } from "~~/composables/auth/auth.config"

const compare = (arr: any[], path: string): boolean => {
    return arr.some((item) => {
        if (item.regex) {
            const re = new RegExp(item.regex.join('|'), 'g')
            return re.test(path)
        } else {
            return item === path
        }
    })
}
export const isAuthRoute = (path) => compare(AuthRoutes, path)