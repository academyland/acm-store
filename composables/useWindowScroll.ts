import { useEventListener, useDebounceFn } from '@vueuse/core'

/**
 * Reactive window scroll.
 *
 * @see https://vueuse.org/useWindowScroll
 * @param options
 */
export function useWindowScroll({ debounceTime = 200 } = {}) {
    if (process.client) {
        const x = ref(window.pageXOffset)
        const y = ref(window.pageXOffset)

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
        return { x: computed(() => 0), y: computed(() => 0) }
    }
}

export type UseWindowScrollReturn = ReturnType<typeof useWindowScroll>