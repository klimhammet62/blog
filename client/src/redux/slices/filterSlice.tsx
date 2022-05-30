import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TInitialValue = {
    searchValue: string;
};
const initialState: TInitialValue = {
    searchValue: "",
};

export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        filterSearch: (
            state: TInitialValue,
            action: PayloadAction<{
                searchValue: string;
            }>
        ) => {
            state.searchValue = action.payload.searchValue;
        },
        defaultState: (state: TInitialValue) => {
            state = initialState;
        },
    },
});

export const { filterSearch, defaultState } = filterSlice.actions;

export default filterSlice.reducer;