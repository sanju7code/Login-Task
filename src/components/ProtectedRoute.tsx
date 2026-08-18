import { Navigate, Outlet } from "react-router";

import {
    ADMIN_ROLE,
    AUTH_KEYS,
    type AuthUser,
} from "../constants/auth";

import { ROUTES } from "../constants/routes";

const ProtectedRoute = () => {

    const isLoggedIn =
        localStorage.getItem(AUTH_KEYS.IS_LOGGED_IN) === "true";

    if (!isLoggedIn) {
        return (
            <Navigate
                to={ROUTES.LOGIN}
                replace
            />
        );
    }

    const userData = localStorage.getItem(AUTH_KEYS.USER);

    if (!userData) {

        localStorage.removeItem(AUTH_KEYS.IS_LOGGED_IN);

        return (
            <Navigate
                to={ROUTES.LOGIN}
                replace
            />
        );
    }

    let user: AuthUser;

    try {

        user = JSON.parse(userData);

    } catch {

        localStorage.removeItem(AUTH_KEYS.USER);
        localStorage.removeItem(AUTH_KEYS.IS_LOGGED_IN);

        return (
            <Navigate
                to={ROUTES.LOGIN}
                replace
            />
        );
    }

    if (user.role !== ADMIN_ROLE) {

        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 p-6">

                <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">

                    <h1 className="text-2xl font-bold text-gray-900">
                        Access Denied
                    </h1>

                    <p className="mt-3 text-sm text-gray-500">
                        You don't have permission to access this admin panel.
                    </p>

                    <button
                        type="button"
                        onClick={() => {

                            localStorage.removeItem(AUTH_KEYS.USER);
                            localStorage.removeItem(AUTH_KEYS.IS_LOGGED_IN);

                            window.location.href = ROUTES.LOGIN;
                        }}
                        className="mt-6 rounded-lg bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
                    >
                        Go to Login
                    </button>

                </div>

            </div>
        );
    }

    return <Outlet />;
};

export default ProtectedRoute;