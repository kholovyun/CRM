import IDoctor from "../../interfaces/IDoctor/IDoctor";
import IDoctorWithUser from "../../interfaces/IDoctor/IDoctorWithUser";
import {api} from "./api";

const doctorsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getDoctors: build.query<IDoctorWithUser[], {offset: number, limit: number}>({
            query: ({offset, limit}) => ({
                url: "/doctors",
                method: "GET",
                params: {offset, limit}
            }),
            providesTags: ["Doctor"]
        }),
        getDoctorById: build.query<IDoctorWithUser, {id: string}>({
            query: ({id}) => ({
                url: `/doctors/${id}`,
                method: "GET"
            }),
        }),
        getDoctorByUserId: build.query<IDoctorWithUser, {id: string}>({
            query: ({id}) => ({
                url: `/doctors/personal/${id}`,
                method: "GET"
            }),
        }),
        editDoctor: build.mutation<IDoctor, {id: string, doctor: FormData}>({
            query: ({id, doctor}) => ({
                url: `/doctors/${id}`,
                method: "PUT",
                body: doctor
            }),
            invalidatesTags: ["Doctor"]
        }),
        activateDoctor: build.mutation<IDoctorWithUser, IDoctorWithUser>({
            query: (doctor) => ({
                url: `/doctors/${doctor.id}`,
                method: "PATCH",
                body: doctor
            }),
            invalidatesTags: ["Doctor"]
        }),
        blockDoctor: build.mutation<IDoctorWithUser, IDoctorWithUser>({
            query: (doctor) => ({
                url: `/users/block/${doctor.userId}`,
                method: "PATCH",
                body: doctor
            }),
            invalidatesTags: ["Doctor"]
        })
    }),
});

export const {
    useGetDoctorsQuery,
    useGetDoctorByIdQuery,
    useGetDoctorByUserIdQuery,
    useEditDoctorMutation,
    useActivateDoctorMutation,
    useBlockDoctorMutation
} = doctorsApi;