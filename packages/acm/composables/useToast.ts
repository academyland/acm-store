import { ToastEnum } from '~/types';
import { useDebounceFn } from '@vueuse/core'
interface Toast {
    message: string;
    type: ToastEnum;
    show: boolean;
}
export const useToast = () => {
    const toastRef = useState<Toast>('--toast--', () => ({ show: false, message: '', type: ToastEnum.info }));
    const debounceClose = useDebounceFn(() => {
        toastRef.value = { ...toastRef.value, show: false }
    }, 3000)
    const showToast = ({ message, type = ToastEnum.info }: { message: string, type: ToastEnum }) => {
        toastRef.value = { message, type, show: true };
        debounceClose();
    }
    return { showToast, toastRef };
}