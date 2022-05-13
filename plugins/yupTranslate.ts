import { setLocale } from 'yup';
export default defineNuxtPlugin(() => {
    setLocale({
        mixed: {
            default: "ورودی نامعتبر است",
            required: "${path} الزامی است ",
        },
        string: {
            email: "باید یک ایمیل معتبر باشد",
        }
    });
})