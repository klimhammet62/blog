import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface AuthState {
    fullName: string | null;
    token: string | null;
}

const initialState: AuthState = {
    fullName: null,
    token: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (
            state: AuthState,
            action: PayloadAction<{ fullName: string; token: string }>
        ) => {
            state.fullName = action.payload.fullName;
            state.token = action.payload.token;
        },
        defaultState: (state: AuthState) => {
            state = initialState;
        },
    },
});


export const { setCredentials, defaultState } = authSlice.actions;

export default authSlice.reducer;
export const selectCurrentUser = (state: RootState) => state.auth.user;