import { FC, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./NewsMain.module.scss";

export const NewsMain: React.FC = (): JSX.Element => {
    const [isEmpty, setIsEmpty] = useState(true);

    return (
        <div className={styles.news_main_wrapper}>
            {
                /* !data */ isEmpty ? (
                    <div className={styles.news_empty_wrapper}>
                        <h1>Загрузите новость! Будьте первым!</h1>
                        <h3 className={styles.registration_action_text}>
                            <i>Для этого зарегистрируйтесь на сайте</i>
                        </h3>
                    </div>
                ) : (
                    <div className="news_block_wrapper">Новости</div>
                )
            }
        </div>
    );
};
