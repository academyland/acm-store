import { Expose } from "class-transformer"
import { Identity } from "./Auth.interface"

export class IdentityDto implements Identity {
    @Expose()
    username: string
    @Expose()
    email?: string
    @Expose()
    first_name?: string
    @Expose()
    last_name?: string
}
