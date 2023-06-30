import IAllergyGetDto from "../../interfaces/IAllergy/IAllergyGetDto";
import { api } from "./api";

const allergiesApi = api.injectEndpoints({
    endpoints: (build) => ({
        getAllergiesByChildId: build.query<IAllergyGetDto[], string>({
            query: (id: string) => ({
                url: `allergies/${id}`,
                method: "GET",
            }),
            providesTags: ["Allergy"]
        })
    })
});

export const {
    useGetAllergiesByChildIdQuery,
    useLazyGetAllergiesByChildIdQuery
} = allergiesApi;