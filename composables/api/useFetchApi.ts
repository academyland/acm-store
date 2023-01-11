import { ClassConstructor, plainToInstance, instanceToPlain } from "class-transformer"
import queryString from 'query-string';
import { FetchError, FetchOptions } from "ofetch"
import { useAuthStore } from "../auth/Auth.store"
import { BASE_URL } from "./api.config"
import { FetchCustomConfig } from "./FetchCustomConfig.interface"
import "reflect-metadata"
import { ToastEnum } from "~~/types"
export const useFetchApi = <R, T = {}>(classTransformer: ClassConstructor<T> = null as unknown as ClassConstructor<T>) => {
    const router = useRouter();
    const { showToast } = useToast()
    const myCustomFetch = (url: string, config: FetchOptions, customConfig: FetchCustomConfig = {}) => {
        config = { baseURL: BASE_URL, retry: 0, ...config }
        customConfig = { goToLogin: true, toastError: true, ...customConfig }
        const authStore = useAuthStore();
        if (customConfig.setToken) {
            if (!config.headers) {
                config.headers = {}
            }
            config.headers['Authorization'] = `Bearer ${authStore.getToken}`
        }

        if (config.params) {
            url = url + '?' + queryString.stringify(config.params, { arrayFormat: 'bracket' })
            delete config.params;
        }
        //@ts-ignore
        return $fetch<R>(url, config)
            .then((res) => {
                const response = (customConfig.beforeResponse ? customConfig.beforeResponse(res) : res);
                if (classTransformer != null) {
                    // console.log("response before transform", response)
                    const instance = plainToInstance(classTransformer, response, { excludeExtraneousValues: true })
                    return instanceToPlain(instance, { excludeExtraneousValues: true }) as unknown as R
                }
                return response
            })
            .catch((e) => {
                if (customConfig.debug && process.dev) {
                    throw Error(e);
                }
                customConfig.onError?.(e)
                if (customConfig.ignoreErrors) {
                    return;
                }

                const { clearStore } = useAuthStore()
                const getValidationErrors = () => {
                    const errors = {} as Record<string, string>
                    if (e?.response?._data && Array.isArray(e.response._data)) {
                        e.response._data.forEach(item => {
                            errors[item.field] = item.message;
                        });
                    }
                    return errors;
                }
                if (e.response && e.response.status === 401) {
                    return handleRefreshToken(e, url, config, customConfig)?.catch((e) => {
                        console.error("error in refresh", e)
                        clearStore();
                        goToLoginIfYouShould(customConfig);
                    }) as unknown as R;

                } else if (e.response && e.response.status == 422) {
                    // console.log("e", e.response)
                    if (customConfig.setErrors) {
                        customConfig.setErrors(getValidationErrors())
                    }
                    if (customConfig.onValidationFailed) {
                        customConfig.onValidationFailed(getValidationErrors(), e);
                    }
                    if (customConfig.toastValidationFields) {
                        customConfig.toastValidationFields.forEach((item) => {
                            if (getValidationErrors()[item]) {
                                showToast({ message: getValidationErrors()[item], type: ToastEnum.error })
                            }
                        })
                    }
                    return;
                }
                else {
                    if ((config.method || '').toLowerCase() == 'get' || !config.method) {
                        showError({
                            statusMessage: e?.response?.statusText || 'خطای دریافت اطلاعات از سرور',
                            statusCode: e?.response?.status || 500,
                        })
                    } else if (customConfig.toastError) {
                        showToast({ message: e?.response?.statusText || 'خطای دریافت اطلاعات از سرور', type: ToastEnum.error })
                    }
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