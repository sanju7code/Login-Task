import {
    Bell,
    ChevronDown,
    Menu,
    Search,
} from "lucide-react";

interface NavbarProps {
    onMenuClick?: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {

    return (
        <header className="sticky top-0 z-20 flex h-[76px] shrink-0 items-center border-b border-gray-100 bg-white/95 px-4 backdrop-blur sm:px-6 lg:px-8">

            <div className="flex w-full items-center justify-between gap-4">

                <button
                    type="button"
                    onClick={onMenuClick}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 text-gray-600 transition hover:bg-gray-50 lg:hidden"
                    aria-label="Open sidebar"
                >
                    <Menu size={21} />
                </button>

                <div className="ml-auto flex items-center gap-3 sm:gap-5">

                    <div className="relative hidden w-[220px] sm:block lg:w-[280px]">

                        <Search
                            size={17}
                            className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            placeholder="Search here..."
                            className="h-10 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-xs text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-purple-400 focus:ring-4 focus:ring-purple-50"
                        />

                    </div>

                    <button
                        type="button"
                        className="relative flex h-10 w-10 items-center justify-center rounded-xl text-gray-600 transition hover:bg-gray-50"
                    >

                        <Bell size={20} />

                        <span className="absolute top-1 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                            3
                        </span>

                    </button>

                    <button
                        type="button"
                        className="flex items-center gap-2 rounded-xl px-1.5 py-1.5 transition hover:bg-gray-50"
                    >

                        <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-gray-700 to-gray-900 text-sm font-bold text-white">
                            A
                        </div>

                        <span className="hidden text-sm font-semibold text-gray-800 sm:block">
                            Admin
                        </span>

                        <ChevronDown
                            size={16}
                            className="hidden text-gray-500 sm:block"
                        />

                    </button>

                </div>

            </div>

        </header>
    );
};

export default Navbar;