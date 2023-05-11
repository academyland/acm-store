export const useErrorHandler = (error: any) => {
    if (unref(error)?.['statusCode'] || unref(error)?.['statusMessage']) {
        showError({
            statusMessage: unref(error)?.['statusMessage'],
            statusCode: unref(error)?.['statusCode']
        })
    }
}