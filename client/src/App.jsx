import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { LoginPage } from "./Pages/Auth/LoginPage";
import { RegisterPage } from "./Pages/Auth/RegisterPage";
import { MainPage } from "./Pages/MainPage/MainPage";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./App.module.scss";
import { useMutation } from "react-query";
import { $api } from "./http/authApi";

export const App = () => {
    const {
        mutate: isAuth,
        isLoading: isAuthLoading,
        error: notAuth,
    } = useMutation("Auth", () =>
        $api({
            url: "/me",
            type: "GET",
            auth: false,
        })
    );

    useEffect(() => {
        isAuth();
        if (notAuth === null) {
            toast(
                "👋Привет! Зарегай аккаунт, чтобы получить возможность выкладывать новости!"
            )
        }
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
