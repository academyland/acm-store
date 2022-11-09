import { useCourseService } from "./useCourse.service";

export const useCourseList = () => {
    const getCourseListFromApi = useCourseService();
    const { data, pending } = useLazyAsyncData(
        "course-list",
        () => getCourseListFromApi(),
        { server: true }
    );
    return { data, pending }
}