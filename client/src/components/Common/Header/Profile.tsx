import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import styles from "./Profile.module.scss";
import { Link } from "react-router-dom";

export const Profile: FC = (): JSX.Element => {
    return (
        <>
            <Link to="/profile">
                <div className={styles.profile_content_wrapper}>
                    <FontAwesomeIcon
                        className={styles.profile_icon}
                        icon={faUser}
                    />
                </div>
            </Link>
        </>
    );
};
