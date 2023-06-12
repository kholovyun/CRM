import IChildWithParentIdDto from "../../interfaces/IChild/IChildWithParentIdDto";
import { api } from "./api";
import IChildGetDto from "../../interfaces/IChild/IChildGetDto.ts";

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
        getChildrenById: build.query<{result: IChildGetDto}, string >({
            query: (data) => ({
                url: `/children/${data}`,
                method: "GET",
            }),
        })
    })
});

export const {
    useGetChildrenByDoctorQuery, useGetChildrenByIdQuery
} = childrenApi;