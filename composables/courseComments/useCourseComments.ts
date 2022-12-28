import { FormActions } from "vee-validate";
import { Ref } from "vue";
import { InferType } from "yup";
import { ToastEnum } from "~~/types";
import { useAuthStore } from "../auth/Auth.store";
import { useCourseCommentsValidator } from "./CourseComment.validator";
import { CourseCommentDto } from "./courseComments.dto";
import { useCourseCommentService, useCourseCreateCommentService } from "./useCourseComment.service";
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

export const useCreateCourseComment = (course_id: Ref<number>) => {
    const { courseCommentSchema, courseCommentSchemaHasFullName } = useCourseCommentsValidator()
    const loading = ref(false);
    const createComment = useCourseCreateCommentService();
    const toast = useToast();
    const authStore = useAuthStore();
    const hasFullName = computed(() => unref(authStore.isLoggedIn) && authStore.identity.first_name && authStore.identity.last_name);
    const submit = async (body: InferType<typeof courseCommentSchema>, { setErrors, resetForm }: FormActions<any>): Promise<void> => {
        if (unref(hasFullName)) {
            body.first_name = authStore.identity.first_name!;
            body.last_name = authStore.identity.last_name!;
        }
        loading.value = true;
        const response = await createComment({ course_id: unref(course_id), ...body }, { setErrors });
        if (response != undefined) {
            toast.showToast({ type: ToastEnum.success, message: "نظر شما با موفقیت ثبت شد و پس از تایید نمایش داده خواهد شد." });
            resetForm();
        }
        loading.value = false;
    }
    const getSchema = computed(() => {
        return unref(hasFullName) ? courseCommentSchemaHasFullName : courseCommentSchema
    })
    return { submit, schema: getSchema, loading, hasFullName };
}