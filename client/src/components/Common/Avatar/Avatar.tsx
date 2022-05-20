import style from "./Avatar.module.scss";
import { Link } from "react-router-dom";

export const Avatar: React.FC = (): JSX.Element => {
    return (
        <Link to="/" className={style.avatar}>
            BELARTY BLOG
        </Link>
    );
};
