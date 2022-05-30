import { useState } from "react";
import { Avatar } from "../Avatar/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Entry } from "../Entry/Entry";
import styles from "./NotSignedHeader.module.scss";

export const NotSignedHeader: React.FC = (): JSX.Element => {
    const [toggleInput, setToggleInput] = useState<boolean>(true);
    const [modal, setModal] = useState<boolean>(false);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    function toggleHeader() {
        setToggleInput(!toggleInput);
    }

    return (
        <>
            {toggleInput ? (
                <div className={styles.input_disabled}>
                    <Avatar />
                    <FontAwesomeIcon
                        className={styles.loupe}
                        icon={faMagnifyingGlass}
                        onClick={toggleHeader}
                    />
                    <Entry modal={modal} setModal={setModal} />
                </div>
            ) : (
                <div className={styles.input_enabled}>
                    <input
                        className={styles.header_input}
                        maxLength={35}
                        placeholder="Поиск статьи по заголовку или тексту..."
                    />
                    <FontAwesomeIcon
                        className={styles.mark_button}
                        icon={faXmark}
                        onClick={toggleHeader}
                    />
                </div>
            )}
        </>
    );
};
