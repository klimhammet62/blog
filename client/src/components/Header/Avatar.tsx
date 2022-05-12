import React from "react";
import style from "./Avatar.module.scss";
import { Link } from "react-router-dom";

export const Avatar = () => {
    return (
        <Link to="/" className={style.avatar}>
            BELARTY BLOG
        </Link>
    );
};
