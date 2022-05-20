import { Route, Routes } from "react-router-dom";
import { LoginPage } from "../Auth/LoginPage";
import { RegisterPage } from "../Auth/RegisterPage";
import { MainPage } from "../MainPage/MainPage";
import style from "./Home.module.scss";

export const Home: React.FC = (): JSX.Element => {
    return (
        <div className={style.main}>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </div>
    );
};
