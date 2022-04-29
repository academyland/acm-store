import { useFetchApi } from "~/composables/api/useFetchApi.ts";
export const useCourseService = () => {
    const $fetch = useFetchApi();
    return () => $fetch("/course/index", { params: { expand: "src,statusText,isRecording,percent" } }).then((response) => {
        return response.map((item) => {
            return { ...item, showAmount: item.amountOff < item.amount }
        })
    })
}