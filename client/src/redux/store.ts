import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { $authApi } from "../service/authService";
import authReducer from "./slices/authSlice";
import filterReducer from "./slices/filterSlice";

const rootReducer = combineReducers({
    authReducer,
    filterReducer,
    [$authApi.reducerPath]: $authApi.reducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat($authApi.middleware),
        devTools: true,
    });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
