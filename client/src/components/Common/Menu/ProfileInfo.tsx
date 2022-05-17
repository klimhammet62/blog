import React from "react";
import { Link } from "react-router-dom";
import styles from "./ProfileInfo.module.scss";

export const ProfileInfo = () => {
    return (
        <div className={styles.menu_wrapper}>
            <div className={styles.profile_info_wrapper}>
                <h1 className={styles.full_name}>Vasya</h1>
                <h3 className={styles.registration_date}>
                    Дата регистрации: 12 декабря 2014 в 12:45
                </h3>
            </div>
            <nav>
                <ul>
                    <li className={styles.home}>
                        <Link to="/"> Главная</Link>
                    </li>
                    <li className={styles.profile}>
                        <Link to="/profile"> Мой профиль</Link>
                    </li>
                    <li className={styles.create_news}>
                        <Link to="/creater">Создать запись</Link>
                    </li>
                    {/* сделать редирект на авторизацию, если не зарегистрирован */}
                    <li className={styles.exit}>
                        <Link to="/"> Выйти</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};
