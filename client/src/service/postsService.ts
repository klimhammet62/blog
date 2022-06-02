import { TSearchQueries } from "./../models/searchTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import {
    TLogin,
    TRegister,
    TIsAuth,
    TRegisterSuccess,
    TLoginSuccess,
} from "../models/AuthTypes";

export const $postsApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${process.env.REACT_APP_CONTENT_API_URL}`,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token");
            if (token) {
                headers.set("Authorization", `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (build) => ({
        createPost: build.mutation<any, any>({
            query: (values) => ({
                url: "/register",
                method: "POST",
                body: values,
                auth: false,
            }),
        }),
        uploadPicture: build.mutation<TLoginSuccess, TLogin>({
            query: (values) => ({
                url: "/posts/upload",
                method: "POST",
                body: values,
                auth: false,
            }),
        }),
        getPosts: build.query<TSearchQueries, TSearchQueries>({
            query: (arg) => {
                const { page, searchValue, userId } = arg;         
                return {
                    url: `posts?page=${page}&query=${searchValue}&userId=${userId}`,
                    params: { page, searchValue, userId },
                };
            },
        }),
    }),
});
export const {
    useCreatePostMutation,
    useUploadPictureMutation,
    useGetPostsQuery,
} = $postsApi;
