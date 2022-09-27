import { useEventListener } from "@vueuse/core"
import { gsap } from "gsap"
import { unref, ref, Ref } from 'vue'
export const useFixMenu = (selector: string, disable: Ref<boolean> | boolean = true): { isFixed: Ref<boolean> } => {
    const isFixed = ref(false)
    let animation: any;
    const doFix = () => {
        if (!unref(isFixed)) {
            isFixed.value = true
            gsap.set(selector, { position: 'fixed', right: 0, left: 0, top: 0, y: '-100%', zIndex: 20, opacity: 0 })
            animation = gsap.to(selector, {
                y: 0, opacity: 1, ease: 'power4', duration: 0.2, onReverseComplete: () => {
                    isFixed.value = false
                    gsap.set(selector, { clearProps: 'all' })

                }
            }).timeScale(0.3)
        }

    }
    const backToNormal = () => {
        if (unref(isFixed)) {
            animation.timeScale(1)
            animation?.reverse()
        }
    }
    useEventListener('scroll', () => {
        if (window.scrollY > 800&&!unref(disable)) {
            doFix()
        } else {
            backToNormal()
        }
    })
    return { isFixed }
}