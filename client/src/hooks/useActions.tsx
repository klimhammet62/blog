import { filterSearch } from "../redux/slices/filterSlice";
import { setModal } from "../redux/slices/authSlice";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useAppDispatch } from "./redux";

const allActions = {
    filterSearch,
    setModal
};

export const useActions = () => {
    const dispatch = useAppDispatch();
    return bindActionCreators(allActions, dispatch);
};
