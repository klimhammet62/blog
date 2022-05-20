import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "../Modal/Modal";
import { TModal } from "../../../models/modalType";
import styles from "./Profile.module.scss";
export const Profile: FC<TModal> = ({ modal, setModal }): JSX.Element => {
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
