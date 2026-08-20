import {
    Eye,
    EyeOff,
    LockKeyhole,
    Mail,
    ShieldCheck,
} from "lucide-react";
import { useState, type FormEvent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { ADMIN_ROLE } from "../../constants/auth";
import { ROUTES } from "../../constants/routes";
import type { AppDispatch } from "../../store";
import { login } from "../../store/slices/authSlice";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        setError("");

        if (
            email === "admin@example.com" &&
            password === "admin123"
        ) {
            const admin = {
                username: "admin",
                email: "admin@example.com",
                role: ADMIN_ROLE,
            };

            dispatch(login(admin));

            navigate(ROUTES.DASHBOARD, {
                replace: true,
            });

            return;
        }

        setError(
            "Invalid email or password. Please try again."
        );
    };

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f8f7ff] px-5 py-10">

            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-purple-200/40 blur-3xl" />

                <div className="absolute -bottom-48 -right-40 h-[600px] w-[600px] rounded-full bg-indigo-200/40 blur-3xl" />

                <div className="absolute left-1/2 top-0 h-40 w-[700px] -translate-x-1/2 rounded-b-[50%] bg-purple-100/50 blur-2xl" />
            </div>

            <section className="relative z-10 w-full max-w-md">

                <div className="rounded-3xl border border-white/70 bg-white/95 p-7 shadow-[0_25px_70px_rgba(79,70,229,0.12)] backdrop-blur sm:p-9">

                    <div className="flex justify-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25">
                            <ShieldCheck size={34} />
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                            Welcome Back
                        </h1>

                        <p className="mt-2 text-sm text-gray-500">
                            Sign in to access your admin panel
                        </p>
                    </div>

                    {error && (
                        <div className="mt-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="mt-7 space-y-5"
                    >
                        <div>
                            <label
                                htmlFor="email"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Email Address
                            </label>

                            <div className="relative">
                                <Mail
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(event) =>
                                        setEmail(event.target.value)
                                    }
                                    placeholder="Enter your email"
                                    autoComplete="email"
                                    required
                                    className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50/50 pl-11 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-100"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-medium text-gray-700"
                            >
                                Password
                            </label>

                            <div className="relative">
                                <LockKeyhole
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                />

                                <input
                                    id="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(event.target.value)
                                    }
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    required
                                    className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50/50 pl-11 pr-11 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-100"
                                />

                                <button
                                    type="button"
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                    onClick={() =>
                                        setShowPassword(
                                            (previous) => !previous
                                        )
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-600"
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex cursor-pointer items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(event) =>
                                        setRememberMe(
                                            event.target.checked
                                        )
                                    }
                                    className="h-4 w-4 rounded border-gray-300 accent-purple-600"
                                />

                                <span className="text-sm text-gray-600">
                                    Remember me
                                </span>
                            </label>

                            <button
                                type="button"
                                className="text-sm font-medium text-purple-600 transition hover:text-purple-700"
                            >
                                Forgot Password?
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="h-12 w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:from-purple-700 hover:to-indigo-700 active:scale-[0.99]"
                        >
                            Sign In
                        </button>
                    </form>

                    <div className="my-7 flex items-center gap-4">
                        <div className="h-px flex-1 bg-gray-200" />

                        <span className="text-xs text-gray-400">
                            OR
                        </span>

                        <div className="h-px flex-1 bg-gray-200" />
                    </div>

                    <button
                        type="button"
                        className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                    >
                        <span className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 text-xs font-bold">
                            G
                        </span>

                        Continue with Google
                    </button>

                    <p className="mt-7 text-center text-xs leading-5 text-gray-400">
                        Need access to the admin panel?
                        <br />
                        Contact your administrator.
                    </p>

                </div>
            </section>
        </main>
    );
};

export default Login;