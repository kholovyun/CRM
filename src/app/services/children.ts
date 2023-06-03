import IChildWithParentIdDto from "../../interfaces/IChild/IChildWithParentIdDto";
import { api } from "./api";

const childrenApi = api.injectEndpoints({
    endpoints: (build) => ({
        getChildrenByDoctor: build.query<IChildWithParentIdDto[], {offset: number, limit: number, id: string}>({
            query: ({offset, limit, id}) => ({
                url: `/children/doctor/${id}`,
                method: "GET",
                params: {offset, limit}
            }),
            providesTags: ["Child"]
        })
    })
});

export const {
    useGetChildrenByDoctorQuery
} = childrenApi;