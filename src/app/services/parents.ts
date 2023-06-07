import IParentWithUserDto from "../../interfaces/IParent/IParentWithUserDto";
import { api } from "./api";

const parentsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getParentsByDoctor: build.query<{rows: IParentWithUserDto[], count: number}, {offset: number, limit: number, id: string}>({
            query: ({offset, limit, id}) => ({
                url: `/parents/doctor/${id}`,
                method: "GET",
                params: {offset, limit}
            }),
            providesTags: ["Parent"]
        })
    })
});

export const {
    useGetParentsByDoctorQuery
} = parentsApi;