import { api } from "./api";
import IUserGetDto from "../../interfaces/IUser/IUserGetDto";
import IUserCreateDto from "../../interfaces/IUser/IUserCreateDto";

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
            invalidatesTags: ["User"]
        })
    })
});

export const {useGetUsersQuery, useGetUserByIdQuery, useCreateUserMutation} = usersApi;