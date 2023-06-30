import IAllergyGetDto from "../../interfaces/IAllergy/IAllergyGetDto";
import IAllergyCreateDto from "../../interfaces/IAllergy/IAllergyCreateDto";
import { api } from "./api";

const allergiesApi = api.injectEndpoints({
    endpoints: (build) => ({
        getAllergiesByChildId: build.query<IAllergyGetDto[], string>({
            query: (id: string) => ({
                url: `allergies/${id}`,
                method: "GET",
            }),
            providesTags: ["Allergy"]
        }),
        createAllergy: build.mutation<IAllergyGetDto, IAllergyCreateDto>({
            query: (allergyDto: IAllergyCreateDto) => ({
                url: "allergies",
                method: "POST",
                body: allergyDto
            }),
            invalidatesTags: ["Allergy"]
        })
    })
});

export const {
    useGetAllergiesByChildIdQuery,
    useLazyGetAllergiesByChildIdQuery,
    useCreateAllergyMutation
} = allergiesApi;