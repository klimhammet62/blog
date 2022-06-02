import { Dispatch, SetStateAction } from "react";

export type TModal = {
    modal?: boolean;
    setModal?: Dispatch<SetStateAction<boolean>>;
};

export type TRegisterErrors = { error: string; errors: { message: string }[] };
