import { object, string } from "yup";

export const useLoginValidator = () => {
    const { $t } = useNuxtApp();
    const schema = object({
        username: string().required().label($t("username")),
        password: string().required().label($t("password")),
    });
    return { schema }
}