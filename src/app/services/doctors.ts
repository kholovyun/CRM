import IDoctor from "../../interfaces/IDoctor/IDoctor";
import IDoctorWhithUser from "../../interfaces/IDoctor/IDoctorWhithUser";
import {api} from "./api";

const doctorsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getDoctors: build.query<IDoctorWhithUser[], {offset: number, limit: number}>({
            query: ({offset, limit}) => ({
                url: "/doctors",
                method: "GET",
                params: {offset, limit},
                providesTags: ["Doctor"]
            })
        }),
        getDoctorById: build.query<IDoctorWhithUser, {id: string}>({
            query: ({id}) => ({
                url: `/doctors/${id}`,
                method: "GET"
            }),
        }),
        editDoctor: build.mutation<IDoctor, {id: string, doctor: FormData}>({
            query: ({id, doctor}) => ({
                url: `/doctors/${id}`,
                method: "PUT",
                body: doctor
            }),
        }),
        activateDoctor: build.mutation<IDoctor, {id: string}>({
            query: ({id}) => ({
                url: `/doctors/${id}`,
                method: "PATCH",
            })
        }),
    }),
});

export const {
    useGetDoctorsQuery,
    useGetDoctorByIdQuery,
    useEditDoctorMutation,
    useActivateDoctorMutation,
} = doctorsApi;