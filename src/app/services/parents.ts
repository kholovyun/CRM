import { IId } from "../../interfaces/IId";
import IParentWithUserDto from "../../interfaces/IParent/IParentWithUserDto";
import IParent from "../../interfaces/IParent/IParrent";
import { api } from "./api";

const parentsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getParentsByDoctor: build.query<
            { rows: IParentWithUserDto[]; count: number },
            { offset: number; limit: number; id: string }
        >({
            query: ({ offset, limit, id }) => ({
                url: `/parents/doctor/${id}`,
                method: "GET",
                params: { offset, limit },
            }),
            providesTags: ["Parent"],
        }),
        getParentByUserId: build.query<IParent, IId>({
            query: (body: IId) => ({
                url: "/parents/alldata",
                method: "GET",
                params: body,
            }),
        }),
        getParentById: build.query<IParent, { id: string }>({
            query: (id) => ({
                url: `/parents/data/${id.id}`,
                method: "GET",
            }),
        }),
    }),
});

export const {
    useLazyGetParentsByDoctorQuery,
    useGetParentByIdQuery,
    useGetParentByUserIdQuery,
} = parentsApi;

export default parentsApi;