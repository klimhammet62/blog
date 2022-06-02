import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import {
    TLogin,
    TRegister,
    TIsAuth,
    TRegisterSuccess,
    TLoginSuccess,
} from "../models/AuthTypes";

export const $authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_CONTENT_API_URL}/auth`,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (build) => ({
        registerUser: build.mutation<TRegisterSuccess, TRegister>({
            query: (credentials) => ({
                url: "/register",
                method: "POST",
                body: credentials,
                auth: false,
            }),
        }),
        loginUser: build.mutation<TLoginSuccess, TLogin>({
            query: (credentials) => ({
                url: "/login",
                method: "POST",
                body: credentials,
                auth: false,
            }),
        }),
        isAuthUser: build.query<TIsAuth, void>({
            query: () => ({
                url: "/me",
                method: "GET",
            }),
        }),
    }),
});
export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useIsAuthUserQuery,
} = $authApi;
