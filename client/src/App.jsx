import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { Error404 } from "./components/Pages/404";
import { routes } from "./Routes/dataRoutes";
import { $authApi } from "./service/authService";
import "react-toastify/dist/ReactToastify.css";

export const App = () => {
    const {
        data: isAuthData,
        isSuccess,
    } = $authApi.useIsAuthUserQuery();

    useEffect(() => {
        console.log(isSuccess);
        if (isSuccess, isAuthData) {
            toast(
                "👋Привет! Зарегай аккаунт, чтобы получить возможность выкладывать новости!"
            )
        }
    }, []);

    return (
        <>
            <Routes>
                {routes.map(route => {
                    return (
                        <Route
                            path={route.path}
                            key={`route ${route.path}`}
                            element={<route.element />}
                        />
                    )
                })}
                <Route path="*" element={<Error404 />} />
            </Routes>
            <ToastContainer />
        </>
    )
}



