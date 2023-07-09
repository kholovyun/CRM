import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IUserGetDtoWithToken from "../interfaces/IUser/IUserGetDtoWithToken";
import usersApi from "../app/services/users";
import IAuthState from "./IAuthState";
import { getTokenFromStorage } from "../helpers/getTokenFromStorage";

const localToken = getTokenFromStorage();

const initialState: IAuthState = {
    user: null,
    token: localToken
};

const authSlice  = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem("token");
            state.token = null;
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            usersApi.endpoints.login.matchFulfilled,
            (state: IAuthState, action: PayloadAction<IUserGetDtoWithToken>) => {
                state.user = action.payload;
                state.token = action.payload.token;
                localStorage.setItem("token", JSON.stringify(action.payload.token));
            }
        );
        builder.addMatcher(
            usersApi.endpoints.editUser.matchFulfilled,
            (state: IAuthState, action: PayloadAction<IUserGetDtoWithToken>) => {
                state.user = action.payload;
                state.token = action.payload.token;
                localStorage.setItem("token", JSON.stringify(action.payload.token));
            }
        );
        builder.addMatcher(
            usersApi.endpoints.checkToken.matchFulfilled,
            (state: IAuthState, action: PayloadAction<IUserGetDtoWithToken>) => {
                state.user = action.payload;
                state.token = action.payload.token;
                localStorage.setItem("token", JSON.stringify(action.payload.token));
            }
        );
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;