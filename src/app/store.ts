import { Middleware, combineReducers, configureStore, isRejectedWithValue } from "@reduxjs/toolkit";
import { api } from "./services/api";
import authReducer, { logout } from "../features/authSlice";
import { PERSIST, persistReducer, persistStore, PURGE, REGISTER } from "redux-persist";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import { toast } from "react-toastify";

export const rtkQueryErrorLogger: Middleware =
  () => (next) => (action) => {
      if (isRejectedWithValue(action)) {
          if(action.payload.originalStatus === 401){
              localStorage.removeItem("persist:root");
              store.dispatch(logout());
              window.location.href = "/login";
          } else if (action.payload.originalStatus === 403){
              window.location.href = "/login";
          } else if (action.payload.status === "FETCH_ERROR") {
              localStorage.removeItem("persist:root");
              store.dispatch(logout());
              toast.error("Ошибка соединения");   
          } else if (action.payload.status === 500) {
              window.location.href = "/login";
          }
      }

      return next(action);
  };

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
        }).concat(api.middleware).concat(rtkQueryErrorLogger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;