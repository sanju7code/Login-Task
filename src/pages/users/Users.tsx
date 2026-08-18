import { useEffect, useMemo, useState } from "react";

import {
    getGithubRepos,
    getGithubUser,
    type GithubRepo,
    type GithubUser,
} from "../../services/github";

type SortOption = "stars" | "name";

const Users = () => {

    const [username, setUsername] = useState("");
    const [user, setUser] = useState<GithubUser | null>(null);
    const [repos, setRepos] = useState<GithubRepo[]>([]);
    const [repoSearch, setRepoSearch] = useState("");
    const [sortBy, setSortBy] = useState<SortOption>("stars");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        const value = username.trim();

        if (!value) {
            setUser(null);
            setRepos([]);
            setError("");
            return;
        }

        const timer = window.setTimeout(async () => {

            setLoading(true);
            setError("");

            try {

                const [userData, repoData] = await Promise.all([
                    getGithubUser(value),
                    getGithubRepos(value),
                ]);

                setUser(userData);
                setRepos(repoData);

            } catch (err) {

                setUser(null);
                setRepos([]);
                setError(
                    err instanceof Error
                        ? err.message
                        : "Unable to load GitHub user."
                );

            } finally {
                setLoading(false);
            }

        }, 500);

        return () => window.clearTimeout(timer);

    }, [username]);

    const filteredRepos = useMemo(() => {

        const value = repoSearch.toLowerCase().trim();

        return repos
            .filter((repo) =>
                repo.name.toLowerCase().includes(value)
            )
            .sort((a, b) =>
                sortBy === "name"
                    ? a.name.localeCompare(b.name)
                    : b.stargazers_count - a.stargazers_count
            );

    }, [repos, repoSearch, sortBy]);

    return (
        <div className="space-y-5">

            {/* Header */}

            <div>

                <h1 className="text-2xl font-bold text-gray-900">
                    GitHub Users
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Search for a GitHub username to view their profile
                    and repositories.
                </p>

            </div>

            {/* Search */}

            <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">

                <label
                    htmlFor="github-user"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    GitHub Username
                </label>

                <div className="flex h-11 overflow-hidden rounded-xl border border-gray-200 bg-gray-50 focus-within:border-purple-500 focus-within:ring-4 focus-within:ring-purple-100">

                    <input
                        id="github-user"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        placeholder="e.g. Sanjeev"
                        className="min-w-0 flex-1 bg-transparent px-4 text-sm outline-none"
                    />

                    <button
                        type="button"
                        onClick={() => setUsername(username.trim())}
                        className="bg-gray-100 px-5 text-xs font-semibold text-gray-700 transition hover:bg-gray-200"
                    >
                        FIND USER →
                    </button>

                </div>

                <p className="mt-2 text-xs text-gray-400">
                    Search starts automatically after you stop typing.
                </p>

            </section>

            {/* Loading */}

            {loading && (
                <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">

                    <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-purple-600" />

                    <p className="mt-4 text-sm text-gray-500">
                        Loading GitHub data...
                    </p>

                </div>
            )}

            {/* Error */}

            {!loading && error && (
                <div className="rounded-2xl border border-red-100 bg-red-50 p-5">

                    <h2 className="font-semibold text-red-700">
                        Unable to load user
                    </h2>

                    <p className="mt-1 text-sm text-red-600">
                        {error}
                    </p>

                </div>
            )}

            {/* Empty State */}

            {!loading && !error && !user && !username && (
                <section className="rounded-2xl border border-dashed border-blue-200 bg-blue-50/30 p-10">

                    <div className="text-center">

                        <h2 className="text-lg font-semibold text-gray-900">
                            Search for a GitHub user
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            Enter a GitHub username above to see their profile
                            and repositories.
                        </p>

                    </div>

                    <div className="mt-7">

                        <h3 className="mb-3 text-sm font-medium text-gray-700">
                            Recommended Users
                        </h3>

                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

                            {["User_A", "User_B", "User_C"].map((name) => (

                                <button
                                    key={name}
                                    type="button"
                                    onClick={() => setUsername(name)}
                                    className="rounded-xl border border-gray-200 bg-white p-4 text-left shadow-sm transition hover:border-purple-300 hover:shadow-md"
                                >

                                    <div className="flex items-center gap-3">

                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-sm font-bold text-gray-600">
                                            {name.replace("User_", "")}
                                        </div>

                                        <div>

                                            <p className="text-sm font-semibold text-gray-900">
                                                {name}
                                            </p>

                                            <p className="text-xs text-gray-400">
                                                Search GitHub profile
                                            </p>

                                        </div>

                                    </div>

                                    <div className="mt-4 flex gap-5 text-xs text-gray-500">
                                        <span>Followers</span>
                                        <span>Repos</span>
                                    </div>

                                </button>

                            ))}

                        </div>

                    </div>

                </section>
            )}

            {/* User Profile */}

            {!loading && user && (
                <>

                    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                            <img
                                src={user.avatar_url}
                                alt={`${user.login} avatar`}
                                className="h-20 w-20 rounded-2xl"
                            />

                            <div className="min-w-0 flex-1">

                                <h2 className="text-xl font-bold text-gray-900">
                                    {user.name || user.login}
                                </h2>

                                <p className="mt-1 text-sm text-purple-600">
                                    @{user.login}
                                </p>

                                {user.bio && (
                                    <p className="mt-2 max-w-2xl text-sm text-gray-500">
                                        {user.bio}
                                    </p>
                                )}

                                <div className="mt-3 flex flex-wrap gap-5 text-sm">

                                    <span>
                                        <strong>{user.followers}</strong>{" "}
                                        <span className="text-gray-500">
                                            followers
                                        </span>
                                    </span>

                                    <span>
                                        <strong>{user.following}</strong>{" "}
                                        <span className="text-gray-500">
                                            following
                                        </span>
                                    </span>

                                    <span>
                                        <strong>{user.public_repos}</strong>{" "}
                                        <span className="text-gray-500">
                                            repositories
                                        </span>
                                    </span>

                                </div>

                            </div>

                            <a
                                href={user.html_url}
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-xl bg-purple-600 px-4 py-3 text-center text-sm font-semibold text-white hover:bg-purple-700"
                            >
                                View Profile
                            </a>

                        </div>

                    </section>

                    {/* Repositories */}

                    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

                        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

                            <div>

                                <h2 className="text-xl font-bold text-gray-900">
                                    Repositories
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    {filteredRepos.length} repositories shown
                                </p>

                            </div>

                            <div className="flex flex-col gap-2 sm:flex-row">

                                <input
                                    value={repoSearch}
                                    onChange={(event) => setRepoSearch(event.target.value)}
                                    placeholder="Filter repositories..."
                                    className="h-10 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                                />

                                <select
                                    value={sortBy}
                                    onChange={(event) =>
                                        setSortBy(event.target.value as SortOption)
                                    }
                                    className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm outline-none focus:border-purple-500"
                                >
                                    <option value="stars">
                                        Sort by stars
                                    </option>

                                    <option value="name">
                                        Sort by name
                                    </option>
                                </select>

                            </div>

                        </div>

                        <div className="mt-5 grid gap-4 md:grid-cols-2">

                            {filteredRepos.map((repo) => (

                                <a
                                    key={repo.id}
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="rounded-xl border border-gray-200 p-4 transition hover:border-purple-300 hover:shadow-sm"
                                >

                                    <div className="flex items-start justify-between gap-3">

                                        <h3 className="font-semibold text-gray-900">
                                            {repo.name}
                                        </h3>

                                        <span className="shrink-0 rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700">
                                            ★ {repo.stargazers_count}
                                        </span>

                                    </div>

                                    <p className="mt-2 min-h-10 text-sm text-gray-500">
                                        {repo.description || "No description available."}
                                    </p>

                                    <p className="mt-3 text-xs font-medium text-purple-600">
                                        {repo.language || "Language not specified"}
                                    </p>

                                </a>

                            ))}

                        </div>

                        {filteredRepos.length === 0 && (
                            <p className="py-10 text-center text-sm text-gray-500">
                                No repositories match your filter.
                            </p>
                        )}

                    </section>

                </>
            )}

        </div>
    );
};

export default Users;