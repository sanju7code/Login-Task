import { Route, Routes } from "react-router";

import { ROUTES } from "../constants/routes";
import ProtectedRoute from "../components/ProtectedRoute";

import Login from "../pages/login/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Users from "../pages/users/Users";
import PageNotFound from "../pages/page-not-found/PageNotFound";
import Layout from "../layouts/Layout";

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public */}
            <Route path={ROUTES.LOGIN} element={<Login />} />

            {/* Protected admin area */}
            <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                    <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
                    <Route path={ROUTES.USERS} element={<Users />} />
                </Route>
            </Route>

            {/* 404 */}
            <Route path={ROUTES.PAGE_NOT_FOUND} element={<PageNotFound />} />
        </Routes>
    );
};

export default AppRoutes;