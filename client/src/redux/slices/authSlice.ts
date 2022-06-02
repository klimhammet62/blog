import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface AuthState {
    fullName: string | null;
    token: string | null;
    isModalShow: boolean;
}

const initialState: AuthState = {
    fullName: null,
    token: null,
    isModalShow: false,
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
        setModal: (
            state: AuthState,
            action: PayloadAction<{ isModalShow: boolean }>
        ) => {
            state.isModalShow = action.payload.isModalShow;
        },
        defaultState: (state: AuthState) => {
            state = initialState;
        },
    },
});

export const { setCredentials, setModal, defaultState } = authSlice.actions;

export default authSlice.reducer;
