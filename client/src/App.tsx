import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./Pages/Auth/LoginPage";
import { RegisterPage } from "./Pages/Auth/RegisterPage";
import { MainPage } from "./Pages/MainPage/MainPage";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./App.module.scss";

export const App = () => {
    useEffect(() => {
        toast(
            "👋Привет! Зарегай аккаунт, чтобы получить возможность выкладывать новости!"
        );
    }, []);

    return (
        <div className={styles.main}>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
            <ToastContainer />
        </div>
    );
};
