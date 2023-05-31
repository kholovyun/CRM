
import IDiplomaCreateDto from "../../interfaces/IDiploma/IDiplomaCreateDto";
import IDiplomaGetDto from "../../interfaces/IDiploma/IDiplomaGetDto";
import IRecommendationCreateDto from "../../interfaces/IRecommendation/IRecommendationCreateDto";
import IRecomendationGetDto from "../../interfaces/IRecommendation/IRecommendationGetDto";
import {api} from "./api";

const diplomasApi = api.injectEndpoints({
    endpoints: (build) => ({
        getDiplomasByDoctor: build.query<IDiplomaGetDto[], string>({
            query: (id: string) => ({
                url: `/diplomas/${id}`,
                method: "GET",
            }),
            providesTags: ["Diploma"]
        }),
        createDiploma: build.mutation<IDiplomaGetDto, FormData>({
            query: (diplomaDto: FormData) => ({
                url: "/diplomas/",
                method: "POST",
                body: diplomaDto
            }),
            invalidatesTags: ["Diploma"]
        })
    }),
});

export const {
    useCreateDiplomaMutation,
    useGetDiplomasByDoctorQuery
} = diplomasApi;