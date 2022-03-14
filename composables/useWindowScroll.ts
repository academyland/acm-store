import { useEventListener, useDebounceFn } from '@vueuse/core'

/**
 * Reactive window scroll.
 *
 * @see https://vueuse.org/useWindowScroll
 * @param options
 */
export function useWindowScroll({ debounceTime = 200 } = {}) {
    if (process.client) {
        const x = ref(typeof window != undefined ? window.pageXOffset : 0)
        const y = ref(typeof window != undefined ? window.pageXOffset : 0)

        const handleScroll = useDebounceFn(() => {
            x.value = window.pageXOffset
            y.value = window.pageYOffset
        }, debounceTime)
        useEventListener(
            'scroll',
            handleScroll,
            {
                capture: false,
                passive: true,
            },
        )

        return { x, y }
    } else {
        return { x: 0, y: 0 }
    }
}

export type UseWindowScrollReturn = ReturnType<typeof useWindowScroll>