import { useIsUserInTheCourseService, useCourseDetailService } from "./useCourse.service";
import { Ref } from "vue"
import { useAuthStore } from "../auth/Auth.store";
import { CourseVideo } from "./courseDetail.dto";
import { BASE_URL } from "../api/api.config";
import qs from "querystringify";
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
    const userCanBuy = inject<CAN_BUY>('canBuy')
    if (userCanBuy == undefined) {
        throw new Error("canBuy inject is undefined in useCanBuyConsumer")
    }
    return toRefs(userCanBuy!)
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
    watchEffect(() => {
        console.log("data", data.value)
    })
    return { data, pending }
}
export const useVideoItem = (item: Ref<CourseVideo>) => {
    const authStore = useAuthStore();
    const userCanBuy = inject<CAN_BUY>("canBuy");
    const isLocked = computed(
        () => userCanBuy?.canBuy && !unref(item).isDemo
    );

    const getDownloadLink = computed(() => {
        return (
            BASE_URL +
            '/site/download?' +
            qs.stringify(
                {
                    key: authStore.getToken,
                    v: unref(item).id,
                    id: unref(item).course_id,
                },
                false
            )
        )
    })
    return { isLocked, getDownloadLink }
}