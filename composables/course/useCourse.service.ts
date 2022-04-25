import { useFetchApi } from "~/composables/api/useFetchApi.ts";
export const useCourseService = () => {
    const $fetch = useFetchApi();
    return () => $fetch("/course/index", { params: { expand: "src,statusText" } })
}