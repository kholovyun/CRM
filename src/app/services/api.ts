import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const state = getState() as RootState;
            const token = state.auth.user?.token;
            if (token) {
                headers.set("Authorization", `${token}`);
            }
        },
    }),
    endpoints: () => ({}),
    tagTypes: [
        "User",
        "Doctor",
        "Recommendation",
        "Diploma",
        "Child",
        "Parent",
        "Question",
        "Review",
        "Message"
    ],
});