import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
    fullName: string | null;
    email: string | null;
    password: string | null;
    token: string | null;
}

const initialState: AuthState = {
    fullName: null,
    email: null,
    password: null,
    token: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (
            state: AuthState,
            action: PayloadAction<{ fullName: string; email: string; password: string; token: string }>
        ) => {
            state.fullName = action.payload.fullName;
            state.email = action.payload.email;
            state.password = action.payload.password;
            state.token = action.payload.token;
        },
        defaultState: (state: AuthState) => {
            state = initialState;
        },
    },
});


export const { setUser, defaultState } = authSlice.actions;

export default authSlice.reducer;
