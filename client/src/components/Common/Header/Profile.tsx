import React, { Dispatch, useState, FC, useEffect, SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "../Modal/Modal";
import styles from "./Profile.module.scss";

export type ModalType = {
    modal: boolean;
    setModal: Dispatch<SetStateAction<boolean>>;
}

export const Profile: FC<ModalType> = ({ modal, setModal }): JSX.Element => {
    return (
        <div className={styles.profile_content_wrapper}>
            <FontAwesomeIcon
                className={styles.profile_icon}
                icon={faUser}
                onClick={() => setModal(!modal)}
            />
            {modal && <Modal modal={modal} setModal={setModal} />}
        </div>
    );
};
