import { onMounted, watch, onUnmounted, unref } from 'vue'

export const useFixBody = (modelValue) => {
    let scrollY
    const doFix = (isAdd, forceRemove = false) => {
        if (typeof window !== 'undefined') {
            const body: Element = document.getElementsByTagName('body')[0]
            const count = forceRemove ? 0 : body.getAttribute('data-count') || 0
            let newCount = 0
            if (body) {
                if (isAdd) {
                    newCount = +count + 1
                    body.setAttribute('data-count', newCount.toString())
                } else if (+count <= 1) {
                    body.removeAttribute('data-count')
                } else {
                    newCount = +count - 1
                    body.setAttribute('data-count', newCount.toString())
                }
                if (newCount < 1) {
                    body.classList.remove('fixed', 'inset-x-0')
                    window.scrollTo(0, scrollY)
                } else {
                    // fix it
                    scrollY = window.scrollY
                    // @ts-ignore
                    body.style.top = scrollY * -1 + 'px'
                    body.classList.add('fixed', 'inset-x-0')
                }
            }
        }
    }
    watch(modelValue, (value) => {
        doFix(!!value)
    })
    onMounted(() => {
        // already open or it's dynamic component
        if (unref(modelValue)) {
            doFix(true)
        }
    })
    onUnmounted(() => {
        if (!scrollY) {
            // for cover modal inside modal
            scrollY = window.scrollY
        }
        doFix(false, true)
    })
}
