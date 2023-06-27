import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IUserGetDtoWithToken from "../interfaces/IUser/IUserGetDtoWithToken";
import usersApi from "../app/services/users";

interface stateUser {
    user: IUserGetDtoWithToken | null
}

const initialState: stateUser = {
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: () => {
            localStorage.removeItem("persist:root");
            return initialState;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            usersApi.endpoints.login.matchFulfilled,
            (state: stateUser, action: PayloadAction<IUserGetDtoWithToken>) => {
                state.user = action.payload;
            }
        );
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;