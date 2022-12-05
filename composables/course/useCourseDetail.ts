import { useIsUserInTheCourseService, useCourseDetailService } from "./useCourse.service";
import { Ref } from "vue"
import { useAuthStore } from "../auth/Auth.store";
type CAN_BUY = { loading: boolean, canBuy: boolean }
const useCanBuyProvider = (courseID: Ref<number | undefined>) => {
    const fetchIsInTheCourse = useIsUserInTheCourseService()
    const authStore = useAuthStore();
    const userCanBuy = reactive<CAN_BUY>({ loading: true, canBuy: false })
    onBeforeMount(() => {
        watch([() => authStore.isLoggedIn, courseID], () => {
            if (unref(courseID) && authStore.isLoggedIn) {
                userCanBuy.loading = true;
                fetchIsInTheCourse(unref(courseID)!).then((isIn) => {
                    if (isIn != undefined) {
                        userCanBuy.canBuy = !isIn;
                    }
                }).finally(() => { userCanBuy.loading = false })
            } else {
                userCanBuy.canBuy = false;
            }
        }, { immediate: true })
    })
    provide<CAN_BUY>('canBuy', userCanBuy)
}
export const useCanBuyConsumer = () => {
    const inTheCourse = inject<CAN_BUY>('canBuy')
    if (inTheCourse == undefined) {
        throw new Error("canBuy inject is undefined in useCanBuyConsumer")
    }
    return toRefs(inTheCourse!)
}
export const useCourseDetail = (slug: string) => {
    const getCourseDetail = useCourseDetailService();
    const { data, pending } = useLazyAsyncData(
        "course-detail" + slug,
        () => getCourseDetail(slug),
        { server: true }
    );
    const courseID = computed(() => unref(data)?.id)
    useCanBuyProvider(courseID);
    return { data, pending }
}
