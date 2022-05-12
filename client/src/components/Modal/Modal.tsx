import React, { FC, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { ModalType } from "../Header/Profile";
import styles from "./Modal.module.scss";

export const Modal: FC<ModalType> = ({ modal, setModal }): JSX.Element => {
    function onModalActive() {
        setModal(!modal);
    }

    return (
        <div className={styles.modal_wrapper}>
            <div className={styles.modal_content}>
                <FontAwesomeIcon
                    className={styles.mark_button}
                    icon={faXmark}
                    onClick={onModalActive}
                />
                <div className={styles.modal_auth_form}>
                    <h1>
                        modalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodalmodal
                        modal modalmodal modalmodal modalmodalmodal modalmodal
                    </h1>
                </div>
            </div>
        </div>
    );
};
