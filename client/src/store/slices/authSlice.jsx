import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import * as axios from "axios";
import { string } from "yup/lib/locale";

const initialState = {
    _id: string,
    fullName: string,
    email: string,
    password: string,
    createdAt: string,
    updatedAt: string,
    __v: null,
    token: string,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (
            state,
            action
        ) => {
            state.name = action.payload.name;
            state.token = action.payload.token;
        },
        removeUser({ state, action }) {
            localStorage.clear();
            state.email = null;
            state.token = "";
            state.id = null;
            state.createdAt = "";
        },
        logoutUser() {},
        defaultState: (state) => {
            state = initialState;
        },
    },
    extraReducers: {}
        
});

export const selectAuth = (state) => state.auth;
export const { setUser, removeUser, logoutUser, defaultState } =
    authSlice.actions;
export default authSlice.reducer;
