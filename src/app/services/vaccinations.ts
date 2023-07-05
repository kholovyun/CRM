import IVaccinationGetDto from "../../interfaces/IVaccination/IVaccinationGetDto";
import { api } from "./api";

const vaccinationsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getVaccinationsByChildId: build.query<IVaccinationGetDto[], string>({
            query: (id: string) => ({
                url: `/vaccinations/${id}`,
                method: "GET",
            }),
            providesTags: ["Vaccination"]
        })
    })
});

export const {
    useGetVaccinationsByChildIdQuery,
    useLazyGetVaccinationsByChildIdQuery
} = vaccinationsApi;