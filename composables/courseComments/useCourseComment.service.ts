import { useFetchApi } from "~/composables/api/useFetchApi";
import { CourseCommentDto } from "./courseComments.dto";
export const useCourseCommentService = () => {
    const $fetch = useFetchApi<CourseCommentDto[], CourseCommentDto>(CourseCommentDto);
    return (course_id) => $fetch("/course-comments/by-course", { params: { course_id, expand: "children,createdDate" } }).then((response) => {
        console.log('response', response)
        return response;
    })
}