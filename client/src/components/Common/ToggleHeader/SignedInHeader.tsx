import { useState } from "react";
import { Avatar } from "../Avatar/Avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowRightFromBracket,
    faMagnifyingGlass,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Profile } from "../Header/Profile";
import styles from "./SignedInHeader.module.scss";
import { useAppSelector } from "../../../hooks/redux";
import { useActions } from "../../../hooks/useActions";
import debounce from "lodash.debounce";

export const SignedInHeader: React.FC = (): JSX.Element => {
    const [toggleInput, setToggleInput] = useState<boolean>(true);
    const [modal, setModal] = useState<boolean>(false);
    const navigate = useNavigate();
    const { filterSearch } = useActions();
const searchDebounce = debounce();
    const token = localStorage.getItem("token");

    const signOut = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

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
                    <FontAwesomeIcon
                        className={styles.exit}
                        icon={faArrowRightFromBracket}
                        onClick={signOut}
                    />
                    <Profile />
                </div>
            ) : (
                <div className={styles.input_enabled}>
                    <input
                        className={styles.header_input}
                        maxLength={35}
                        placeholder="Поиск статьи по заголовку или тексту..."
                        value={searchValue}
                        onChange={(e) => filterSearch(e.target.value)}
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
