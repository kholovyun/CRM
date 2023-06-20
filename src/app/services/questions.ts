import IQuestionGetDto from "../../interfaces/IQuestion/IQuestionGetDto";
import { api } from "./api";

const questionsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getQuestionsByChildId: build.query<IQuestionGetDto[], string>({
            query: (id: string) => ({
                url: `/questions/child/${id}`,
                method: "GET",
            }),
            providesTags: ["Question"]
        })
    })
});

export const {
    useGetQuestionsByChildIdQuery,
    useLazyGetQuestionsByChildIdQuery
} = questionsApi;