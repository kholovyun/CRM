import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IUserGetDtoWithToken from "../interfaces/IUser/IUserGetDtoWithToken";
import usersApi from "../app/services/users";
import { ERoles } from "../enums/ERoles";

interface IStateDoctor {
    doctorId: string | null
}

const initialState: IStateDoctor = {
    doctorId: null,
};

const doctorSlice = createSlice({
    name: "doctor",
    initialState,
    reducers: {
        setDoctor: (state, action) => {
            state.doctorId = action.payload;
        },
        clearDoctor: (state) => {
            state.doctorId = null;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            usersApi.endpoints.login.matchFulfilled,
            (state: IStateDoctor, action: PayloadAction<IUserGetDtoWithToken>) => {
                if (action.payload.role === ERoles.DOCTOR) {
                    state.doctorId = action.payload.id;
                }
            }
        );
    },
});

export const { setDoctor, clearDoctor } = doctorSlice.actions;
export default doctorSlice.reducer;