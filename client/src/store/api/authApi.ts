import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5656/auth" }),
    endpoints: (builder) => ({
        LoginUser: builder.mutation({
            query: (body: { username: string; password: string }) => {
                return {
                    url: "/login",
                    method: "POST",
                    body,
                };
            },
        }),
        signUpUser: builder.mutation({
            query: (body: {
                name: string;
                email: string;
                password: string;
            }) => {
                return {
                    url: "/register",
                    method: "POST",
                    body,
                };
            },
        }),
        isAuthUser: builder.mutation({
            query: (body) => {
                return {
                    url: "/me",
                    method: "GET",
                    body,
                };
            },
        }),
        /* deleteUser: builder.mutation({
            query: (body) => {
                return {
                    url: "/delete",
                    method: "DELETE",
                    body,
                };
            },
        }),
        resetPassword: builder.mutation({
            query: (body: { token: string; password: string }) => {
                return {
                    url: "/resetPassword",
                    method: "post",
                    body,
                };
            },
        }), */
    }),
});

export const { useLoginUserMutation, useSignUpUserMutation, useIsAuthUserMutation } = authApi;
 