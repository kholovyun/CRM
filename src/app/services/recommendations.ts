
import IRecommendationCreateDto from "../../interfaces/IRecommendation/IRecommendationCreateDto";
import IRecommendationGetDto from "../../interfaces/IRecommendation/IRecommendationGetDto";
import { IMessage } from "../../interfaces/IUser/IMessage";
import {api} from "./api";

const recommendationsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getRecommendationsByDoctor: build.query<IRecommendationGetDto[], string>({
            query: (id: string) => ({
                // url: `/recommendations/${id}`,
                url: `/recommendations/${id}`,
                method: "GET",
            }),
            providesTags: ["Recommendation"]
        }),
        createRecommendation: build.mutation<IRecommendationGetDto, IRecommendationCreateDto>({
            query: (recommendationDto: IRecommendationCreateDto) => ({
                url: "/recommendations/",
                method: "POST",
                body: recommendationDto
            }),
            invalidatesTags: ["Recommendation"]
        }),
        editRecommendation: build.mutation<IRecommendationGetDto, {id: string, recommendation: IRecommendationCreateDto}>({
            query: ({id, recommendation}) => ({
                url: `/recommendations/${id}`,
                method: "PUT",
                body: recommendation
            }),
            invalidatesTags: ["Recommendation"]
        }),
        deleteRecommendation: build.mutation<IMessage, string>({
            query: (id: string) => ({
                url: `/recommendations/${id}`,
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