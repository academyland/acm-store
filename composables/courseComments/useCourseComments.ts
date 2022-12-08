import { Ref } from "vue";
import { CourseCommentDto } from "./courseComments.dto";
import { useCourseCommentService } from "./useCourseComment.service";
export const useCourseComments = (course_id: Ref<number>) => {
    const state = reactive<{ loading: boolean, comments: CourseCommentDto[] }>({ loading: true, comments: [] });
    const $fetch = useCourseCommentService();
    onMounted(() => {
        $fetch(unref(course_id)).then(comments => {
            if (comments != undefined) {
                state.comments = comments;
                state.loading = false;
            }
        }).finally(() => {
            state.loading = false;
        })
    })
    const isEmpty = computed(() => {
        return !state.loading && state.comments.length == 0;
    })
    return {
        ...toRefs(state),
        isEmpty
    }
}