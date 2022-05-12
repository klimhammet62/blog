import { FC, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import styles from "./ToggleMenu.module.scss";
import { ProfileInfo } from "../ProfileInfo";

export const ToggleMenu: FC = () => {
    const [IsShown, setIsShown] = useState(true);
    return IsShown ? (
        <div
            className={styles.toggle_menu_wrapper_unactive}
            onMouseEnter={() => setIsShown(false)}
        >
            <h1 className={styles.toggle_menu_text}>МЕНЮ</h1>
            <div className={styles.scroll_arrow}></div>
        </div>
    ) : (
        <div
            className={styles.toggle_menu_wrapper_active}
            onMouseLeave={() => setIsShown(true)}
        >
            <ProfileInfo />
            <div className={styles.scroll_arrow_reverse}></div>
        </div>
    );
};
