import fa from "~/i18n/fa"
export default defineNuxtPlugin(() => {
    const getText = (field) => {
        const resolvePath = (object, path, defaultValue) => path.split('.').reduce((o, p) => (o ? o[p] : defaultValue), object)
        return resolvePath(fa.messages, field, '')
    }
    const replaceParams = (text, params) => {
        Object.keys(params).forEach((key) => {
            text = text.replace('{' + key + '}', params[key])
        })
        return text
    }
    const translate = (field, params: Record<string, string> = {}) => {
        const text = getText(field)
        const res = replaceParams(text, params)
        if (res == undefined || res == '') {
            console.error(field, ': is not translated')
        }
        return res
    }
    return {
        provide: {
            't': translate
        }
    }
})