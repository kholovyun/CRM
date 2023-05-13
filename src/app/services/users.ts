import { api } from "./api";
import IUserGetDto from "../../interfaces/IUser/IUserGetDto";
import IUserCreateDto from "../../interfaces/IUser/IUserCreateDto";
import IUserGetDtoWithToken from "../../interfaces/IUser/IUserGetDtoWithToken";
import IUserLoginDto from "../../interfaces/IUser/IUserLoginDto";

const usersApi = api.injectEndpoints({
    endpoints: build => ({
        getUsers: build.query<IUserGetDto[], void>({
            query: () => ({
                url: "/users",
                method: "get"
            }),
            providesTags: ["User"]
        }),
        getUserById: build.query<IUserGetDto, string>({
            query: (id: string) => ({
                url: `/users/${id}`,
                method: "get"
            })
        }),
        createUser: build.mutation<IUserCreateDto, IUserCreateDto>({
            query: (userDto: IUserCreateDto) => ({
                url: "/users",
                method: "post",
                body: userDto
            }),
            // invalidatesTags: ["User"]
        }),
        login: build.mutation<IUserGetDtoWithToken, IUserLoginDto>({
            query: (body: IUserLoginDto) => ({
                url: "/users/login",
                method: "post",
                body
            })
        })
    })
});

export const { useGetUsersQuery, useGetUserByIdQuery, useCreateUserMutation, useLoginMutation } = usersApi;
export default usersApi;