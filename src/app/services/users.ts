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
            invalidatesTags: ["User"]
        }),
        login: build.mutation<IUserGetDtoWithToken, IUserLoginDto>({
            query: (body: IUserLoginDto) => ({
                url: "/users/login",
                method: "post",
                body
            })
        }),
        blockUser: build.mutation<IUserGetDto, string>({
            query: (id: string) => ({
                url: `/users/block/${id}`,
                method: "patch"
            })
        })
    })
});

export const { 
    useGetUsersQuery, 
    useGetUserByIdQuery, 
    useCreateUserMutation, 
    useLoginMutation, 
    useBlockUserMutation } = usersApi;
export default usersApi;