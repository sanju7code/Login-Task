import {
    Bell,
    FileText,
    LockKeyhole,
    UserPlus,
    UserRoundCheck,
    UserRoundMinus,
    UsersRound,
    UserRoundCog,
    ShieldCheck,
    TrendingUp,
} from "lucide-react";

const stats = [
    { title: "Total Users", value: "1,248", change: "12.5%", icon: UsersRound, iconBg: "bg-[#eeebff]", iconColor: "text-[#5849ef]" },
    { title: "Active Users", value: "892", change: "8.3%", icon: UserRoundCheck, iconBg: "bg-[#e8faf3]", iconColor: "text-[#08ad78]" },
    { title: "New Users", value: "156", change: "15.2%", icon: UserRoundCog, iconBg: "bg-[#fff6df]", iconColor: "text-[#f2a800]" },
    { title: "Total Roles", value: "12", change: "3.1%", icon: ShieldCheck, iconBg: "bg-[#eaf2ff]", iconColor: "text-[#3578ed]" },
];

const activities = [
    { title: "New user registered", user: "John Doe", time: "2 min ago", icon: UserPlus, bg: "bg-[#e8faf3]", color: "text-[#00aa76]" },
    { title: "User role updated", user: "Jane Smith", time: "15 min ago", icon: FileText, bg: "bg-[#fff7df]", color: "text-[#f0a000]" },
    { title: "User deleted", user: "Robert Brown", time: "1 hr ago", icon: UserRoundMinus, bg: "bg-[#fff0f1]", color: "text-[#ef4b56]" },
    { title: "Password changed", user: "Emily Davis", time: "2 hr ago", icon: LockKeyhole, bg: "bg-[#edf4ff]", color: "text-[#2878ef]" },
];

const summaryCards = [
    { title: "Notifications", value: "3 new notifications", icon: Bell, bg: "bg-[#edf4ff]", color: "text-[#2878ef]" },
    { title: "New registrations", value: "24 users today", icon: UserPlus, bg: "bg-[#e8faf3]", color: "text-[#00aa76]" },
    { title: "Active users", value: "892 active users", icon: UsersRound, bg: "bg-[#fff0f1]", color: "text-[#ef4b56]" },
];

const chartPoints = [
    [45, 205], [105, 165], [165, 150], [225, 185], [285, 110],
    [345, 125], [405, 140], [465, 70], [525, 100], [585, 150],
    [645, 95], [705, 55], [770, 15],
];

const Dashboard = () => {
    return (
        <div className="space-y-5 sm:space-y-6">
            <div>
                <h1 className="text-[26px] font-bold tracking-tight text-[#111936] sm:text-[28px]">
                    Dashboard
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                    Overview of your admin panel
                </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;

                    return (
                        <div
                            key={stat.title}
                            className="min-w-0 rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_3px_15px_rgba(17,25,54,0.06)]"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-gray-500">
                                        {stat.title}
                                    </p>
                                    <p className="mt-2 text-[27px] font-bold tracking-tight text-[#111936]">
                                        {stat.value}
                                    </p>
                                </div>

                                <div
                                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${stat.iconBg} ${stat.iconColor}`}
                                >
                                    <Icon size={24} strokeWidth={1.9} />
                                </div>
                            </div>

                            <div className="mt-4 flex items-center gap-1.5 text-xs">
                                <TrendingUp size={14} className="text-[#00b878]" />
                                <span className="font-semibold text-[#00b878]">
                                    {stat.change}
                                </span>
                                <span className="text-gray-400">
                                    from last month
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(330px,1fr)]">
                <section className="min-w-0 rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_3px_15px_rgba(17,25,54,0.06)] sm:p-6">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <h2 className="text-lg font-bold text-[#111936]">
                                Overview
                            </h2>
                            <p className="mt-1 text-xs text-gray-400">
                                User activity for this month
                            </p>
                        </div>

                        <select
                            defaultValue="This Month"
                            className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-[#5b4df6]"
                        >
                            <option>This Month</option>
                            <option>Last Month</option>
                            <option>Last 3 Months</option>
                        </select>
                    </div>

                    <div className="mt-6 w-full overflow-hidden">
                        <svg
                            viewBox="0 0 800 330"
                            className="h-auto w-full min-w-[520px]"
                            preserveAspectRatio="none"
                            role="img"
                            aria-label="Monthly users overview chart"
                        >
                            {[30, 90, 150, 210, 270].map((y) => (
                                <line
                                    key={y}
                                    x1="45"
                                    y1={y}
                                    x2="770"
                                    y2={y}
                                    stroke="#eef0f5"
                                />
                            ))}

                            <path
                                d="M45 205 L105 165 L165 150 L225 185 L285 110 L345 125 L405 140 L465 70 L525 100 L585 150 L645 95 L705 55 L770 15 L770 270 L45 270 Z"
                                fill="url(#chartGradient)"
                            />

                            <path
                                d="M45 205 L105 165 L165 150 L225 185 L285 110 L345 125 L405 140 L465 70 L525 100 L585 150 L645 95 L705 55 L770 15"
                                fill="none"
                                stroke="#5b4df6"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />

                            {chartPoints.map(([cx, cy], index) => (
                                <circle
                                    key={index}
                                    cx={cx}
                                    cy={cy}
                                    r="5"
                                    fill="white"
                                    stroke="#5b4df6"
                                    strokeWidth="2"
                                />
                            ))}

                            {[
                                ["1K", 34],
                                ["800", 94],
                                ["600", 154],
                                ["400", 214],
                                ["200", 274],
                            ].map(([label, y]) => (
                                <text
                                    key={label}
                                    x="8"
                                    y={y}
                                    fill="#9ca3af"
                                    fontSize="12"
                                >
                                    {label}
                                </text>
                            ))}

                            {[
                                ["May 1", 75],
                                ["May 7", 210],
                                ["May 13", 340],
                                ["May 19", 465],
                                ["May 25", 590],
                                ["May 31", 730],
                            ].map(([label, x]) => (
                                <text
                                    key={label}
                                    x={x}
                                    y="310"
                                    fill="#9ca3af"
                                    fontSize="12"
                                >
                                    {label}
                                </text>
                            ))}

                            <defs>
                                <linearGradient
                                    id="chartGradient"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="0%"
                                        stopColor="#5b4df6"
                                        stopOpacity="0.18"
                                    />
                                    <stop
                                        offset="100%"
                                        stopColor="#5b4df6"
                                        stopOpacity="0"
                                    />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </section>

                <section className="min-w-0 rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_3px_15px_rgba(17,25,54,0.06)] sm:p-6">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <h2 className="text-lg font-bold text-[#111936]">
                                Recent Activity
                            </h2>
                            <p className="mt-1 text-xs text-gray-400">
                                Latest admin activity
                            </p>
                        </div>

                        <button
                            type="button"
                            className="shrink-0 text-sm font-semibold text-[#5b4df6] hover:text-[#4435dd]"
                        >
                            View All
                        </button>
                    </div>

                    <div className="mt-6 space-y-5">
                        {activities.map((activity) => {
                            const Icon = activity.icon;

                            return (
                                <div
                                    key={activity.title}
                                    className="flex items-center gap-4"
                                >
                                    <div
                                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${activity.bg} ${activity.color}`}
                                    >
                                        <Icon size={22} strokeWidth={1.8} />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-bold text-[#111936]">
                                            {activity.title}
                                        </p>
                                        <p className="mt-1 text-sm text-gray-500">
                                            {activity.user}
                                        </p>
                                    </div>

                                    <span className="shrink-0 text-xs text-gray-400">
                                        {activity.time}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                {summaryCards.map((card) => {
                    const Icon = card.icon;

                    return (
                        <div
                            key={card.title}
                            className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_3px_15px_rgba(17,25,54,0.06)]"
                        >
                            <div
                                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${card.bg} ${card.color}`}
                            >
                                <Icon size={22} />
                            </div>

                            <div>
                                <p className="text-sm text-gray-500">
                                    {card.title}
                                </p>
                                <p className="mt-1 font-bold text-[#111936]">
                                    {card.value}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Dashboard;