import { IMessage } from "../../interfaces/IUser/IMessage";
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
        }),
        deleteVaccination: build.mutation<IMessage, string>({
            query: (id: string) => ({
                url: `/vaccinations/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Vaccination"]
        })
    })
});

export const {
    useGetVaccinationsByChildIdQuery,
    useLazyGetVaccinationsByChildIdQuery,
    useDeleteVaccinationMutation
} = vaccinationsApi;