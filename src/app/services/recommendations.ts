import IRecommendationCreateDto from "../../interfaces/IRecommendation/IRecommendationCreateDto";
import IRecomendationGetDto from "../../interfaces/IRecommendation/IRecommendationGetDto";
import {api} from "./api";

const recommendationsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getRecommendationsByDoctor: build.query<IRecomendationGetDto[], string>({
            query: (id: string) => ({
                // url: `/recommendations/${id}`,
                url: `/recomendations/${id}`,
                method: "GET",
            }),
            providesTags: ["Recommendation"]
        }),
        createRecommendation: build.mutation<IRecomendationGetDto, IRecommendationCreateDto>({
            query: (recommendationDto: IRecommendationCreateDto) => ({
                url: "/recomendations/",
                // url: "/recommendations/",
                method: "POST",
                body: recommendationDto
            }),
            invalidatesTags: ["Recommendation"]
        }),
        editRecommendation: build.mutation<IRecomendationGetDto, {id: string, recommendation: IRecommendationCreateDto}>({
            query: ({id, recommendation}) => ({
                url: `/recomendations/${id}`,
                // url: "/recommendations/",
                method: "PUT",
                body: recommendation
            }),
            invalidatesTags: ["Recommendation"]
        }),
        deleteRecommendation: build.mutation<string, string>({
            query: (id: string) => ({
                url: `/recomendations/${id}`,
                // url: "/recommendations/${id}",
                method: "DELETE"
            }),
            invalidatesTags: ["Recommendation"]
        })
    }),
});

export const {
    useCreateRecommendationMutation,
    useGetRecommendationsByDoctorQuery,
    useDeleteRecommendationMutation,
    useLazyGetRecommendationsByDoctorQuery,
    useEditRecommendationMutation
} = recommendationsApi;