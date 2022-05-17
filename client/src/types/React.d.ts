import { SetStateAction, Dispatch } from "react";

type TModal = {
    modal: boolean;
    setModal: Dispatch<SetStateAction<boolean>>;
};
