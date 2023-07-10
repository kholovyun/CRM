import ISpecialistExamsGetDto from "../../interfaces/ISpecialistExams/ISpecialistExamsGetDto";
import { api } from "./api";

const spexExamsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getSpecExamsByChildId: build.query<ISpecialistExamsGetDto[], string>({
            query: (id: string) => ({
                url: `/examinations/${id}`,
                method: "GET",
            }),
            providesTags: ["Examination"]
        }),
    })
});

export const {
    useGetSpecExamsByChildIdQuery,
    useLazyGetSpecExamsByChildIdQuery
} = spexExamsApi;