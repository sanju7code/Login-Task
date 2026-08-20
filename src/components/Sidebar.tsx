import {
    Activity,
    BarChart3,
    Grid2X2,
    LogOut,
    Settings,
    Shield,
    Users,
    UserCog,
    X,
} from "lucide-react";

import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router";

import { ROUTES } from "../constants/routes";
import type { AppDispatch } from "../store";
import { logout } from "../store/slices/authSlice";

interface SidebarProps {
    mobileOpen?: boolean;
    onClose?: () => void;
}

const Sidebar = ({
    mobileOpen = false,
    onClose,
}: SidebarProps) => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const navigationItems = [
        {
            name: "Dashboard",
            path: ROUTES.DASHBOARD,
            icon: Grid2X2,
        },
        {
            name: "Users",
            path: ROUTES.USERS,
            icon: Users,
        },
        {
            name: "Roles",
            path: "#",
            icon: UserCog,
        },
        {
            name: "Reports",
            path: "#",
            icon: BarChart3,
        },
        {
            name: "Settings",
            path: "#",
            icon: Settings,
        },
        {
            name: "Activity Log",
            path: "#",
            icon: Activity,
        },
    ];

    const handleLogout = () => {
        dispatch(logout());

        navigate(ROUTES.LOGIN, {
            replace: true,
        });
    };

    return (
        <>
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                className={`
                    fixed inset-y-0 left-0 z-50
                    flex h-screen w-[270px] flex-col
                    bg-[#111936] text-white
                    transition-transform duration-300
                    lg:sticky lg:top-0 lg:z-30 lg:translate-x-0
                    ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                <div className="flex h-[96px] shrink-0 items-center justify-between px-7">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#6857ff] to-[#4d3df2] shadow-lg shadow-purple-500/20">
                            <Shield
                                size={26}
                                strokeWidth={2}
                                className="text-white"
                            />
                        </div>

                        <span className="text-[23px] font-bold tracking-tight text-white">
                            AdminPanel
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close sidebar"
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-white/70 transition hover:bg-white/10 hover:text-white lg:hidden"
                    >
                        <X size={22} />
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto px-5 py-5">
                    <div className="space-y-2">
                        {navigationItems.map((item) => {
                            const Icon = item.icon;

                            if (item.path === "#") {
                                return (
                                    <button
                                        key={item.name}
                                        type="button"
                                        className="flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-left text-[16px] font-medium text-white/70 transition hover:bg-white/5 hover:text-white"
                                    >
                                        <Icon
                                            size={22}
                                            strokeWidth={1.8}
                                            className="shrink-0"
                                        />

                                        <span>{item.name}</span>
                                    </button>
                                );
                            }

                            return (
                                <NavLink
                                    key={item.name}
                                    to={item.path}
                                    onClick={onClose}
                                    className={({ isActive }) => `
                                        flex items-center gap-4
                                        rounded-2xl px-5 py-4
                                        text-[16px] font-medium
                                        transition-all duration-200
                                        ${
                                            isActive
                                                ? "bg-gradient-to-r from-[#6555f5] to-[#5644ec] text-white shadow-lg shadow-purple-900/30"
                                                : "text-white/70 hover:bg-white/5 hover:text-white"
                                        }
                                    `}
                                >
                                    {({ isActive }) => (
                                        <>
                                            <Icon
                                                size={22}
                                                strokeWidth={
                                                    isActive ? 2.2 : 1.8
                                                }
                                                className="shrink-0"
                                            />

                                            <span>{item.name}</span>
                                        </>
                                    )}
                                </NavLink>
                            );
                        })}
                    </div>
                </nav>

                <div className="mt-auto shrink-0 px-5 pb-7">
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-4 rounded-2xl px-5 py-4 text-[16px] font-medium text-white/75 transition hover:bg-white/5 hover:text-white"
                    >
                        <LogOut
                            size={22}
                            strokeWidth={1.8}
                            className="shrink-0"
                        />

                        <span>Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;