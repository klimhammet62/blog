import { FC } from "react";
import { Modal } from "../Modal/Modal";
import { TModal } from "../../../models/modalType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import styles from './Entry.module.scss';

export const Entry: FC<TModal> = ({ modal, setModal }): JSX.Element => {
    return (
        <div className={styles.profile_content_wrapper}>
            <FontAwesomeIcon
                className={styles.enter}
                icon={faRightToBracket}
                onClick={() => setModal(!modal)}
            />
            {modal && <Modal modal={modal} setModal={setModal} />}
        </div>
    );
};
