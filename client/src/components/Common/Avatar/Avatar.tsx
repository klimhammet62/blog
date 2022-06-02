import style from "./Avatar.module.scss";
import { TModal } from "../../../models/modalType";

export const Avatar: React.FC<TModal> = ({ modal, setModal }): JSX.Element => {
    function handleClick() {
        if (modal && setModal) {
            setModal(!modal);
        }
    }
    return (
        <div className={style.avatar} onClick={() => handleClick()}>
            BELARTY BLOG
        </div>
    );
};
