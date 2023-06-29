import IVisitGetDto from "../../interfaces/IVisit/IVisitGetDto";
import IVisitCreateDto from "../../interfaces/IVisit/IVisitCreateDto";
import { api } from "./api";

const visitsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getVisitsByChildId: build.query<IVisitGetDto[], string>({
            query: (id: string) => ({
                url: `/visits/${id}`,
                method: "GET",
            }),
            providesTags: ["Visit"]
        }),
        createVisit: build.mutation<IVisitGetDto, IVisitCreateDto>({
            query: (visitDto: IVisitCreateDto) => ({
                url: "visits",
                method: "POST",
                body: visitDto
            }),
            invalidatesTags: ["Visit"]
        })
    })
});

export const {
    useGetVisitsByChildIdQuery,
    useLazyGetVisitsByChildIdQuery,
    useCreateVisitMutation
} = visitsApi;