import { plainToClass } from "class-transformer";
import { useFetchApi } from "~/composables/api/useFetchApi.ts";
import { CourseDto } from "./course.dto";
export const useCourseService = () => {
    const $fetch = useFetchApi<CourseDto>(CourseDto);
    return () => $fetch("/course/index", { params: { expand: "src,statusText,isRecording,percent" } })
}