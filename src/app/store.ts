import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { api } from "./services/api";
import authReducer from "../features/authSlice";
import { PERSIST, persistReducer, persistStore, PURGE, REGISTER } from "redux-persist";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage,
    version: 1,
    blackList: ["api"],
    stateReconcier: autoMergeLevel2
};

const rootReducer = combineReducers({
    auth: authReducer,
    [api.reducerPath]: api.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck:
            {
                ignoredActions: [REGISTER, PERSIST, PURGE],
            },
        }).concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;