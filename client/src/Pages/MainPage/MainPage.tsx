import { FC } from "react";
import { NewsMain } from "./News/NewsMain";
import { ProfileMain } from "./ProfileMain";
import { Navigate } from "react-router-dom";
import styles from "./MainPage.module.scss";
import { Header } from "../../components/Header/Header";
import { ToggleMenu } from "../../components/Menu/ToggleMenu/ToggleMenu";
/* ЧЕРНОЕ БЕЛОЕ switch */
export const MainPage: FC = () => {
    return (
        <div className={styles.wrapper}>
            <ProfileMain />
            <div className={styles.news_main_wrapper}>
                <div className={styles.header_wrapper}>
                    <Header />
                </div>
                <div className={styles.news_wrapper}>
                    <NewsMain />
                </div>
            </div>
            <div className={styles.toggle_menu_wrapper}>
                <ToggleMenu />
            </div>
        </div>
    );
};
