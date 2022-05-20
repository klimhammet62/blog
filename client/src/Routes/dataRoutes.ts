import { LoginPage } from "../components/Pages/Auth/LoginPage";
import { Dashboard } from "../components/Pages/Dashboard/Dashboard";
import { Home } from "../components/Pages/Home/Home";
import { Profile } from "../components/Pages/Profile/Profile";

export const routes = [
    {
        path: "/",
        exact: true,
        component: Home,
        auth: false,
    },
    {
        path: "/login",
        exact: false,
        component: LoginPage,
        auth: false,
    },
    {
        path: "/dashboard",
        exact: false,
        component: Dashboard,
        auth: true,
    },
    {
        path: "/profile",
        exact: false,
        component: Profile,
        auth: true,
    },
];
