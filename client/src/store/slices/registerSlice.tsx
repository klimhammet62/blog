import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
    _id: string | null,
    fullName: string | null,
    email: string | null,
    password: string | null,
    createdAt: string | null,
    updatedAt: string | null,
    __v: null,
    token: string | null,
}

const initialState: AuthState = {
    _id: null,
    fullName: null,
    email: null,
    password: null,
    createdAt: null,
    updatedAt: null,
    __v: null,
    token: null,
};

export const registerSlice = createSlice({
    name: "registerApi",
    initialState,
    reducers: {
        getUser: (
            state: AuthState,
            action: PayloadAction<{
                fullName: string;
                email: string;
                token: string;
            }>
        ) => {
            state.fullName = action.payload.fullName;
            state.email = action.payload.email;
            state.token = action.payload.token;
        },
        defaultState: (state: AuthState) => {
            state = initialState;
        },
    },
});

export const { getUser, defaultState } = registerSlice.actions;

export default registerSlice.reducer;