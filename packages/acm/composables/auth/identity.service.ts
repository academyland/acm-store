import { Identity } from '~/composables/auth/Auth.interface';
import { useFetchApi } from '../api/useFetchApi';
import { IdentityDto } from './Auth.dto';
export const useIdentityService = () => {
    const fetchData = useFetchApi<Identity, IdentityDto>(IdentityDto);
    return (params = {}) =>
        fetchData("/site/identity", { params }, { setToken: true, goToLogin: false })
}