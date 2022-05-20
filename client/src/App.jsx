import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation } from "react-query";
import { $authApi } from "./http/authApi";
import { Error404 } from "./components/Pages/404";
import { routes } from "./Routes/dataRoutes";
import styles from "./App.module.scss";

export const App = () => {
    const {
        mutate: isAuth,
        isLoading: isAuthLoading,
        error: notAuth,
    } = useMutation("Auth", () =>
        $authApi({
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
        <Routes>
            <Route>
                {routes.map(route => {
                    if (route.auth && !isAuth) {
                        return false
                    }

                    return (
                        <Route
                            path={route.path}
                            exact={route.exact}
                            key={`route ${route.path}`}
                        >
                            <route.component />
                        </Route>
                    )
                })}
                <Route component={Error404} />
            </Route>
            <ToastContainer />
        </Routes>
    )
}



