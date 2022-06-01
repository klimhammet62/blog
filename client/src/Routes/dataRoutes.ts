import { RegisterPage } from "../components/Pages/Auth/RegisterPage";
import { LoginPage } from "../components/Pages/Auth/LoginPage";
import { Dashboard } from "../components/Pages/Dashboard/Dashboard";
import { Home } from "../components/Pages/Home/Home";
import { Profile } from "../components/Pages/Profile/Profile";

export const routes = [
    {
        path: "/",
        element: Home,
        auth: false,
    },
    {
        path: "/login",
        element: LoginPage,
        auth: false,
    },
    {
        path: "/register",
        element: RegisterPage,
        auth: false,
    },
    {
        path: "/dashboard",
        element: Dashboard,
        auth: true,
    },
    {
        path: "/profile",
        element: Profile,
        auth: true,
    },
];
