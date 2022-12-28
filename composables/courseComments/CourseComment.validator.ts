import { object, string } from "yup";

export const useCourseCommentsValidator = () => {
    const { $t } = useNuxtApp();
    const courseCommentSchema = object({
        first_name: string().required().label($t("first_name")),
        last_name: string().required().label($t("last_name")),
        comment: string().required().label($t("comment")),
    });
    const courseCommentSchemaHasFullName = object({
        comment: string().required().label($t("comment")),
    });
    return { courseCommentSchema, courseCommentSchemaHasFullName: courseCommentSchemaHasFullName }
}