import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignedInHeader } from "../ToggleHeader/SignedInHeader";
import { NotSignedHeader } from "../ToggleHeader/NotSignedHeader";
import styles from "./Header.module.scss";

export const Header: FC = (): JSX.Element => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const signOut = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className={styles.header}>
            {token ? <SignedInHeader /> : <NotSignedHeader />}
        </div>
    );
};
