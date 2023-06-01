import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import usersApi from "../app/services/users";
import IParent from "../interfaces/IParrent/IParrent";

interface IStateParrent {
    parrent: IParent | null
}

const initialState: IStateParrent = {
    parrent: null,
};

const parrentSlice = createSlice({
    name: "parrent",
    initialState,
    reducers: {
        setParrent: (state, action) => {
            state.parrent = action.payload;
        },
        clearParrent: (state) => {
            state.parrent = null;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            usersApi.endpoints.getParentbyUserId.matchFulfilled,
            (state: IStateParrent, action: PayloadAction<IParent>) => {
                if (action.payload) {
                    state.parrent = action.payload;
                }
            }
        );
    },
});

export const { setParrent, clearParrent } = parrentSlice.actions;
export default parrentSlice.reducer;