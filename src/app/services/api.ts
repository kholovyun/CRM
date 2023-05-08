import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const state = getState() as RootState;
            const token = state.auth;
            if (token) {
                headers.set("authorization", `Bearer ${token}`);
            }
        },
    }),
    endpoints: () => ({}),
    tagTypes: ["User"],
});