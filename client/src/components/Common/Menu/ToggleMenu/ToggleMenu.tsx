import { FC, useState } from "react";
import styles from "./ToggleMenu.module.scss";
import { ProfileInfo } from "../ProfileInfo";

export const ToggleMenu: React.FC = (): JSX.Element => {
    const [IsShown, setIsShown] = useState(false);
    return IsShown ? (
        <div
            className={styles.toggle_menu_wrapper_active}
            onMouseLeave={() => setIsShown(false)}
        >
            <ProfileInfo />
            <div className={styles.scroll_arrow_reverse}></div>
        </div>
    ) : (
        <div
            className={styles.toggle_menu_wrapper_unactive}
            onMouseEnter={() => setIsShown(true)}
        >
            <h1 className={styles.toggle_menu_text}>МЕНЮ</h1>
            <div className={styles.scroll_arrow}></div>
        </div>
    );
};
