import { createSlice } from "@reduxjs/toolkit";
import { IUser, IUserState } from "../../models/UserTypes";

const initialState: IUserState = {
    user: {} as IUser,
    userError: "",
    userLoading: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
});

export default userSlice.reducer;
