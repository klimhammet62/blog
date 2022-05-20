import { Dispatch, SetStateAction } from "react";

export type TModal = {
    modal: boolean;
    setModal: Dispatch<SetStateAction<boolean>>;
};
