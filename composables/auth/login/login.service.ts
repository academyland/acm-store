import { InferType } from "yup";
import { CLIENT_ID, CLIENT_SECRET } from "~~/composables/api/api.config";
import { FetchCustomConfig } from "~~/composables/api/FetchCustomConfig.interface";
import { useFetchApi } from "~~/composables/api/useFetchApi"
import { AuthTokens, Identity } from "../Auth.interface"
import { LoginDto } from "./Login.dto";
import { useLoginValidator } from "./login.validator";
export const useLoginService = () => {
    const fetchData = useFetchApi<LoginDto, LoginDto>(LoginDto)
    const { schema } = useLoginValidator()
    const login = ({ username, password }: InferType<typeof schema>, customConfig: FetchCustomConfig = {}, cartData) =>

        fetchData("/oauth2/rest/token", {
            method: "post",
            body: {
                username,
                password,
                grant_type: 'password',
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                // cart: cartData
            }
        }, customConfig).then((response) => {
            if (response !== undefined) {
                const { access_token, refresh_token, expires_in, identity } = response
                return {
                    tokens: {
                        accessToken: access_token,
                        refreshToken: refresh_token,
                        expiresIn: new Date().getTime() + expires_in * 1000,
                    },
                    identity: identity,
                };
            }
            return response
        });
    return { login }
}