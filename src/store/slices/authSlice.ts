import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import {
    AUTH_KEYS,
    type AuthUser,
} from "../../constants/auth";

interface AuthState {
    user: AuthUser | null;
    isLoggedIn: boolean;
}

const getInitialUser = (): AuthUser | null => {
    const userData = localStorage.getItem(AUTH_KEYS.USER);

    if (!userData) {
        return null;
    }

    try {
        return JSON.parse(userData) as AuthUser;
    } catch {
        localStorage.removeItem(AUTH_KEYS.USER);
        return null;
    }
};

const initialUser = getInitialUser();

const initialState: AuthState = {
    user: initialUser,
    isLoggedIn:
        localStorage.getItem(AUTH_KEYS.IS_LOGGED_IN) === "true" &&
        initialUser !== null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<AuthUser>) => {
            state.user = action.payload;
            state.isLoggedIn = true;

            localStorage.setItem(
                AUTH_KEYS.USER,
                JSON.stringify(action.payload)
            );

            localStorage.setItem(
                AUTH_KEYS.IS_LOGGED_IN,
                "true"
            );
        },

        logout: (state) => {
            state.user = null;
            state.isLoggedIn = false;

            localStorage.removeItem(AUTH_KEYS.USER);
            localStorage.removeItem(
                AUTH_KEYS.IS_LOGGED_IN
            );
        },
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;