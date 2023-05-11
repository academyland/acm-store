import { Expose, Type } from "class-transformer"
import { IdentityDto } from "../Auth.dto"
export class LoginDto {
    @Expose()
    @Type(() => IdentityDto)
    identity: IdentityDto
    @Expose()
    access_token
    @Expose()
    refresh_token
    @Expose()
    expires_in
}
