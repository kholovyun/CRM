import IChildWithParentIdDto from "../../interfaces/IChild/IChildWithParentIdDto";
import { api } from "./api";
import IChildGetDto from "../../interfaces/IChild/IChildGetDto.ts";
import IChildCreateDto from "../../interfaces/IChild/IChildCreateDto.ts";

const childrenApi = api.injectEndpoints({
    endpoints: (build) => ({
        getChildrenByDoctor: build.query<{rows: IChildWithParentIdDto[], count: number}, {offset: number, limit: number, id: string}>({
            query: ({offset, limit, id}) => ({
                url: `/children/doctor/${id}`,
                method: "GET",
                params: {offset, limit}
            }),
            providesTags: ["Child"]
        }),
        getChildrenByParent: build.query<IChildGetDto[], string>({
            query: (id: string) => ({
                url: `/children/parent/${id}`,
                method: "GET",
            }),
            providesTags: ["Child"]
        }),
        getChildrenById: build.query<IChildGetDto, string >({
            query: (data) => ({
                url: `/children/${data}`,
                method: "GET",
            }),
            providesTags: ["Child"]
        }),
        createChild: build.mutation<IChildGetDto, IChildCreateDto>({
            query: (child: IChildCreateDto) => ({
                url: "/children",
                method: "POST",
                body: child,
            }),
            invalidatesTags: ["Child"],
        }),
        editChild: build.mutation<IChildGetDto, { id: string, child: FormData }>({
            query: ({ id, child }) => ({
                url: `/children/${id}`,
                method: "PATCH",
                body: child,
            }),
            invalidatesTags: ["Child"],
        })
    })
});

export const {
    useLazyGetChildrenByDoctorQuery,
    useLazyGetChildrenByParentQuery,
    useGetChildrenByIdQuery, 
    useEditChildMutation,
    useCreateChildMutation
} = childrenApi;