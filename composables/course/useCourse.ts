import { useCourseService } from "./useCourse.service";

export const useCourseList = () => {
    const getCourseListFromApi = useCourseService();
    const { data, pending } = useLazyAsyncData(
        "home-mountains",
        () => getCourseListFromApi(),
        { server: false }
    );
    return { data, pending }
}