import { useCourseService } from "./useCourse.service";

export const useCourseList = () => {
    const getCourseListFromApi = useCourseService();
    const { data, pending, error, execute } = useLazyAsyncData(
        "course-list",
        () => getCourseListFromApi(),
        { server: true, immediate: process.server }
    );
    onMounted(() => {
        if (!unref(data)) {
            execute();
        }
    })

    useErrorHandler(error);
    return { data, pending }
}