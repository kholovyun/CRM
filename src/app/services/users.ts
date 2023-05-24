import { api } from "./api";
import IUserGetDto from "../../interfaces/IUser/IUserGetDto";
import IUserCreateDto from "../../interfaces/IUser/IUserCreateDto";
import IUserGetDtoWithToken from "../../interfaces/IUser/IUserGetDtoWithToken";
import IUserLoginDto from "../../interfaces/IUser/IUserLoginDto";
import IUserUpdateDto from "../../interfaces/IUser/IUpdateUserDto";

const usersApi = api.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query<IUserGetDto[], {offset: number, limit: number, filter: string}>({
            query: ({offset, limit, filter}) => ({
                url: "/users",
                method: "GET",
                params: {offset, limit, filter}
            }),
            providesTags: ["User"]
        }),
        getUserById: build.query<IUserGetDto, string>({
            query: (id: string) => ({
                url: `/users/${id}`,
                method: "GET"
            }),
            providesTags: ["User"]
        }),
        createUser: build.mutation<IUserCreateDto, IUserCreateDto>({
            query: (userDto: IUserCreateDto) => ({
                url: "/users",
                method: "POST",
                body: userDto
            }),
            invalidatesTags: ["User", "Doctor"]
        }),
        editUser: build.mutation<IUserCreateDto, {id: string, userDto:IUserUpdateDto}>({
            query: ({id, userDto}) => ({
                url: `/users/${id}`,
                method: "PATCH",
                body: userDto
            }),
            invalidatesTags: ["User"]
        }),
        login: build.mutation<IUserGetDtoWithToken, IUserLoginDto>({
            query: (body: IUserLoginDto) => ({
                url: "/users/login",
                method: "POST",
                body
            }),
        }),
        blockUser: build.mutation<IUserGetDto, IUserGetDto>({
            query: (user) => ({
                url: `/users/block/${user.id}`,
                method: "PATCH",
                body: user
            }),
            invalidatesTags: ["User"]
        })
    })
});

export const { 
    useGetUsersQuery, 
    useGetUserByIdQuery, 
    useCreateUserMutation, 
    useLoginMutation, 
    useBlockUserMutation,
    useEditUserMutation
} = usersApi;
export default usersApi;