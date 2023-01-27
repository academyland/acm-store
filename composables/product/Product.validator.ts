import { object, string } from "yup";

export const useProductValidator = () => {
    const { $t } = useNuxtApp();
    const productSchema = object({
            product_name: string().required().label($t("product_name")),
           description: string().label($t("description")),
            price: string().required().label($t("price")),
    });
    return {  productSchema }
}