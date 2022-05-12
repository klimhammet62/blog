import { Route, Routes } from "react-router-dom";
import style from "./App.module.scss";
import { LoginPage } from "./Pages/Auth/LoginPage";
import { RegisterPage } from "./Pages/Auth/RegisterPage";
import { MainPage } from "./Pages/MainPage/MainPage";

export const App = () => {
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
