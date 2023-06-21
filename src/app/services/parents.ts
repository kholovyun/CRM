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
        getParentByUserId: build.query<IParent, {id: string}>({
            query: ({ id }) => ({
                url: `/parents/${id}`,
                method: "GET",
                providesTags: ["Parent"],
            }),
        })
    }),
});

export const {
    useLazyGetParentsByDoctorQuery,
    useGetParentByUserIdQuery,
} = parentsApi;

export default parentsApi;