import { MainPage } from "../MainPage/MainPage";
import style from "./Home.module.scss";

export const Home: React.FC = (): JSX.Element => {
    return (
        <div className={style.main}>
            <MainPage />
        </div>
    );
};
