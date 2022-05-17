import { FC } from "react";
import { NewsMain } from "./News/NewsMain";
import { ProfileMain } from "./ProfileMain";
import { useNavigate } from "react-router-dom";
import { Header } from "../../components/Common/Header/Header";
import { ToggleMenu } from "../../components/Common/Menu/ToggleMenu/ToggleMenu";
import styles from "./MainPage.module.scss";
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
