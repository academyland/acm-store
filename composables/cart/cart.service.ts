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