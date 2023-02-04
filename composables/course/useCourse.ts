import { useCourseService } from "./useCourse.service";

export const useCourseList = () => {
    const getCourseListFromApi = useCourseService();
    const { data, pending, error } = useLazyAsyncData(
        "course-list",
        () => getCourseListFromApi(),
        { server: true }
    );
    useErrorHandler(error);
    return { data, pending }
}