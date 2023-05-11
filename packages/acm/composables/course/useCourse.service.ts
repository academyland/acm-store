import { bool } from "yup";
import { useFetchApi } from "~/composables/api/useFetchApi";
import { CourseDto } from "./course.dto";
import { CourseDetailDto } from "./courseDetail.dto";
export const useCourseService = () => {
    const $fetch = useFetchApi<CourseDto[], CourseDto>(CourseDto);
    return () => $fetch("/course/index", { params: { expand: "src,statusText,isRecording,percent" } })
}
export const useCourseDetailService = () => {
    const $fetch = useFetchApi<CourseDetailDto, CourseDetailDto>(CourseDetailDto);
    return (slug: string) => $fetch("/course/view", { params: { slug, expand: "courseDuration,computedEstimateDuration,statusText,src,courseQuestions,courseChapters.courseVideos.duration,userCounter" } })
}

export const useIsUserInTheCourseService = () => {
    const $fetch = useFetchApi<Boolean>();
    return (id: number) => $fetch("/course-videos/is-user-in-the-course", { params: { id } }, { setToken: true }).then((response) => !!response)
}