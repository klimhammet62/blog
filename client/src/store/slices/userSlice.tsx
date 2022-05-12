import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: null,
    password: null,
    token: null,
    id: null,
    createdAt: "",
    modalOpen: false,
    userAuth: false,
    fullName: "",
};
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action) {
            state.email = action.payload.email;
            state.password = action.payload.password;
            state.fullName = action.payload.fullName;
            state.token = action.payload.token;
            state.id = action.payload.id;
            state.createdAt = action.payload.createdAt;
            state.userAuth = true;
        },
        removeUser(state, action) {
            state.email = null;
            state.fullName = "";
            state.token = null;
            state.id = null;
            state.createdAt = "";
            state.userAuth = false;
        },
        renameUser(state, action) {
            state.email = action.payload.email;
            state.password = action.payload.password;
            state.fullName = action.payload.fullName;
            state.userAuth = true;
        },
        logoutUser(state, action) {
            state.userAuth = false;
            state.fullName = "";
        },
    },
});

export const { setUser, removeUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
