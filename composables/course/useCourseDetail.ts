import { useCourseDetailService } from "./useCourse.service";

export const useCourseDetail = (slug: string) => {
    const getCourseDetail = useCourseDetailService();
    const { data, pending } = useLazyAsyncData(
        "course-detail" + slug,
        () => getCourseDetail(slug),
        { server: true }
    );
    return { data, pending }
}