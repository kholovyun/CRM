import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IUserGetDtoWithToken from "../interfaces/IUser/IUserGetDtoWithToken";
import usersApi from "../app/services/users";

interface IUserState {
    user: IUserGetDtoWithToken | null
}

const initialState: IUserState = {
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
            (state: IUserState, action: PayloadAction<IUserGetDtoWithToken>) => {
                state.user = action.payload;
            }
        );
        builder.addMatcher(
            usersApi.endpoints.editUser.matchFulfilled,
            (state: IUserState, action: PayloadAction<IUserGetDtoWithToken>) => {
                state.user = action.payload;
            }
        );
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;