export const AUTH_KEYS = {
  USER: "user",
  IS_LOGGED_IN: "isLoggedIn",
} as const;

export const ADMIN_ROLE = "admin";

export interface AuthUser {
  username: string;
  role: string;
}