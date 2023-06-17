import IReviewWithUserGetDto from "../../interfaces/IReview/IReviewWithUserGetDto";
import { IMessage } from "../../interfaces/IUser/IMessage";
import { api } from "./api";

const reviewsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getReviews: build.query<{rows: IReviewWithUserGetDto[], count: number}, {offset: number, limit: number}>({
            query: ({offset, limit}) => ({
                url: "/reviews",
                method: "GET",
                params: {offset, limit}
            }),
            providesTags: ["Review"]
        }),
        deleteReview: build.mutation<{response: IMessage}, {id: string}>({
            query: ({id}) => ({
                url: `/reviews/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Review"]
        })
    }),
});

export const {
    useGetReviewsQuery,
    useDeleteReviewMutation
} = reviewsApi;