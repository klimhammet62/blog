import React, { FC, useState, useEffect } from "react";
import { Avatar } from "./Avatar";
import { Profile } from "./Profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";

export const Header: FC = () => {
    const [toggleInput, setToggleInput] = useState<boolean>(true);
    const [modal, setModal] = useState<boolean>(false);
    const navigate = useNavigate();

    const signOut = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    };
    useEffect(() => {}, [modal]);

    function toggleHeader() {
        setToggleInput(!toggleInput);
    }

    return (
        <div className={styles.header}>
            {toggleInput ? (
                <div className={styles.input_disabled}>
                    <Avatar />
                    <FontAwesomeIcon
                        className={styles.loupe}
                        icon={faMagnifyingGlass}
                        onClick={toggleHeader}
                    />
                    <Profile modal={modal} setModal={setModal} />
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
            {/* {!!token ? (
                <div className={styles.input_disabled}>
                    <Avatar />
                    <FontAwesomeIcon
                        className={styles.loupe}
                        icon={faMagnifyingGlass}
                        onClick={toggleHeader}
                    />
                    <Profile modal={modal} setModal={setModal} />
                </div>
            ) : (
                <div className={styles.input_disabled}>
                    <Avatar />
                    <FontAwesomeIcon
                        className={styles.loupe}
                        icon={faMagnifyingGlass}
                        onClick={toggleHeader}
                    />
                    <Profile modal={modal} setModal={setModal} />
                </div>
            )} */}
        </div>
    );
};
