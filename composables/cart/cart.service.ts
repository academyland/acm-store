import { boolean } from 'yup';
import { useFetchApi } from '../api/useFetchApi';
import { CartDto } from './Cart.dto';
const beforeResponse = (response) => {
    if (response) {
        return response.map((item) => item.course)
    }
}
export const useCartListService = () => {
    const fetchData = useFetchApi<CartDto, CartDto>(CartDto);
    const listWhenLoggedIn = () => {
        return fetchData("/cart/index", { params: { expand: 'course.src,course.statusText,course.isRecording,course.percent' } }, { setToken: true, beforeResponse })
    }
    const listWhenNotLoggedIn = (ids: number[]) => {
        console.log("ids", ids)
        return fetchData("/cart/course-by-id", { params: { id: ids, expand: 'src,statusText,isRecording,percent' } })

    }
    return { listWhenLoggedIn, listWhenNotLoggedIn }
}

export const useAddToCartService = () => {
    const fetchData = useFetchApi<CartDto, CartDto>(CartDto);
    return (course_id) => {
        return fetchData("/cart/add",
            {
                params: { expand: 'course.src,course.statusText,course.isRecording,course.percent' },
                method: 'post',
                body: { course_id }
            }
            , { setToken: true, beforeResponse, toastValidationFields: ['course_id'] })
    }
}
export const useDeleteCartService = () => {
    const fetchData = useFetchApi<boolean>();
    return (course_id) => {
        return fetchData('/cart/delete', { params: { course_id }, method: 'delete' })
    }
}