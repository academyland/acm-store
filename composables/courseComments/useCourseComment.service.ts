import { InferType } from "yup";
import { useFetchApi } from "~/composables/api/useFetchApi";
import { FetchCustomConfig } from "../api/FetchCustomConfig.interface";
import { useCourseCommentsValidator } from "./CourseComment.validator";
import { CourseCommentDto } from "./courseComments.dto";
export const useCourseCommentService = () => {
    const $fetch = useFetchApi<CourseCommentDto[], CourseCommentDto>(CourseCommentDto);
    return (course_id) => $fetch("/course-comments/by-course", { params: { course_id, expand: "children,createdDate" } }).then((response) => {
        // console.log('response', response)
        return response;
    })
}

export const useCourseCreateCommentService = () => {
    const $fetch = useFetchApi();
    const { courseCommentSchema } = useCourseCommentsValidator()
    type BODY_TYPE = InferType<typeof courseCommentSchema>
    interface BODY extends BODY_TYPE {
        course_id: number
    }
    return (body: BODY, customConfig: FetchCustomConfig = {}) => $fetch("/course-comments/create", { method: 'post', body }, { setToken: true, ...customConfig }).then((response) => {
        return response;
    })
}
