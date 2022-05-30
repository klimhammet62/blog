import { Link } from "react-router-dom";
import styles from "./ProfileInfo.module.scss";

export const ProfileInfo: React.FC = (): JSX.Element => {
    const signOut = () => {
        localStorage.removeItem("token");
    };
    return (
        <div className={styles.menu_wrapper}>
            <div className={styles.profile_info_wrapper}>
                <h1 className={styles.full_name}>Vasya</h1>
                <h3 className={styles.registration_date}>
                    Дата регистрации: <br />
                    12 декабря 2014 в 12:45
                </h3>
            </div>
            <nav className={styles.menu_nav}>
                <ul className={styles.menu_ul}>
                    <Link to="/" className={styles.link}>
                        <li className={styles.menu_li}>Главная</li>
                    </Link>
                    <Link to="/profile" className={styles.link}>
                        <li className={styles.profile_li}>Мой профиль</li>
                    </Link>
                    <Link to="/dashboard" className={styles.link}>
                        <li className={styles.create_news_li}>
                            Создать запись
                        </li>
                    </Link>
                    <Link to="/login" className={styles.link}>
                        <li className={styles.auth_li}>Авторизация</li>
                    </Link>
                    <Link to="/" className={styles.link} onClick={signOut}>
                        <li className={styles.exit_li}>Выйти</li>
                    </Link>
                    {/* сделать редирект на авторизацию, если не зарегистрирован */}
                </ul>
            </nav>
        </div>
    );
};
