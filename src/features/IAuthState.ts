import IUserGetDtoWithToken from "../interfaces/IUser/IUserGetDtoWithToken";

export default interface IAuthState {
    user: IUserGetDtoWithToken | null
    token: string | null
}