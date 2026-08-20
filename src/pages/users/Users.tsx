import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import {
    getGithubRepos,
    getGithubUser,
    type GithubRepo,
    type GithubUser,
} from "../../services/github";

import useDebounce from "../../hooks/useDebounce";

type SortOption = "stars" | "name";

const Users = () => {

    const [username, setUsername] = useState("");
    const [repoSearch, setRepoSearch] = useState("");
    const [sortBy, setSortBy] =
        useState<SortOption>("stars");

    const searchUsername = useDebounce(
        username.trim(),
        500
    );

    const {
        data,
        isLoading,
        isError,
        error,
    } = useQuery<GithubUser & { repos: GithubRepo[] }>({
        queryKey: ["github-user", searchUsername],

        queryFn: async () => {
            const [user, repos] = await Promise.all([
                getGithubUser(searchUsername),
                getGithubRepos(searchUsername),
            ]);

            return { ...user, repos };
        },

        enabled: searchUsername.length > 0,
        staleTime: 1000 * 60 * 5,
    });

    const user = data ?? null;
    const repos = data?.repos ?? [];

    const filteredRepos = useMemo(() => {
        const filtered = repos.filter((repo) =>
            repo.name
                .toLowerCase()
                .includes(repoSearch.toLowerCase())
        );

        return [...filtered].sort((a, b) =>
            sortBy === "name"
                ? a.name.localeCompare(b.name)
                : b.stargazers_count - a.stargazers_count
        );
    }, [repos, repoSearch, sortBy]);

    return (
        <div className="space-y-6">

            {/* Header */}

            <div>

                <h1 className="text-2xl font-bold text-gray-900">
                    GitHub Users
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Search for a GitHub username to view their
                    profile and repositories.
                </p>

            </div>

            {/* Search */}

            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

                <label
                    htmlFor="github-user"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    GitHub Username
                </label>

                <input
                    id="github-user"
                    type="text"
                    value={username}
                    onChange={(event) =>
                        setUsername(event.target.value)
                    }
                    placeholder="e.g. Sanjeev"
                    className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none transition focus:border-purple-500 focus:bg-white focus:ring-4 focus:ring-purple-100"
                />

                <p className="mt-2 text-xs text-gray-400">
                    Search starts automatically after you stop typing.
                </p>

            </section>

            {/* Loading */}

            {isLoading && (
                <section className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">

                    <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-purple-600" />

                    <p className="mt-4 text-sm text-gray-500">
                        Loading GitHub data...
                    </p>

                </section>
            )}

            {/* Error */}

            {!isLoading && isError && (
                <section className="rounded-2xl border border-red-100 bg-red-50 p-5">

                    <p className="font-semibold text-red-700">
                        Unable to load user
                    </p>

                    <p className="mt-1 text-sm text-red-600">
                        {error instanceof Error
                            ? error.message
                            : "Something went wrong."}
                    </p>

                </section>
            )}

            {/* User */}

            {!isLoading && !isError && user && (
                <>

                    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                            <img
                                src={user.avatar_url}
                                alt={`${user.login} avatar`}
                                className="h-24 w-24 rounded-2xl"
                            />

                            <div className="min-w-0 flex-1">

                                <h2 className="text-xl font-bold text-gray-900">
                                    {user.name || user.login}
                                </h2>

                                <p className="mt-1 text-sm text-purple-600">
                                    @{user.login}
                                </p>

                                {user.bio && (
                                    <p className="mt-3 max-w-2xl text-sm text-gray-500">
                                        {user.bio}
                                    </p>
                                )}

                                <div className="mt-4 flex flex-wrap gap-5 text-sm">

                                    <span>
                                        <strong className="text-gray-900">
                                            {user.followers}
                                        </strong>{" "}
                                        <span className="text-gray-500">
                                            followers
                                        </span>
                                    </span>

                                    <span>
                                        <strong className="text-gray-900">
                                            {user.following}
                                        </strong>{" "}
                                        <span className="text-gray-500">
                                            following
                                        </span>
                                    </span>

                                    <span>
                                        <strong className="text-gray-900">
                                            {user.public_repos}
                                        </strong>{" "}
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
                                className="rounded-xl bg-purple-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-purple-700"
                            >
                                View GitHub
                            </a>

                        </div>

                    </section>

                    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                            <div>

                                <h2 className="text-xl font-bold text-gray-900">
                                    Repositories
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    {filteredRepos.length} repositories shown
                                </p>

                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row">

                                <input
                                    type="text"
                                    value={repoSearch}
                                    onChange={(event) =>
                                        setRepoSearch(event.target.value)
                                    }
                                    placeholder="Filter repositories..."
                                    className="h-10 rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
                                />

                                <select
                                    value={sortBy}
                                    onChange={(event) =>
                                        setSortBy(
                                            event.target.value as SortOption
                                        )
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
                                    className="rounded-xl border border-gray-200 p-5 transition hover:border-purple-300 hover:shadow-sm"
                                >
                                    <div className="flex items-start justify-between gap-3">

                                        <h3 className="font-semibold text-gray-900">
                                            {repo.name}
                                        </h3>

                                        <span className="shrink-0 rounded-full bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-700">
                                            ★ {repo.stargazers_count}
                                        </span>

                                    </div>

                                    <p className="mt-3 min-h-10 text-sm text-gray-500">
                                        {repo.description ||
                                            "No description available."}
                                    </p>

                                    <p className="mt-4 text-xs font-medium text-purple-600">
                                        {repo.language ||
                                            "Language not specified"}
                                    </p>

                                </a>
                            ))}

                        </div>

                        {filteredRepos.length === 0 && (
                            <div className="py-10 text-center">

                                <p className="text-sm text-gray-500">
                                    No repositories match your filter.
                                </p>

                            </div>
                        )}

                    </section>

                </>
            )}

            {/* Empty State */}

            {!isLoading &&
                !isError &&
                !user &&
                !username && (
                    <section className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">

                        <h2 className="text-lg font-semibold text-gray-900">
                            Search for a GitHub user
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            Enter a GitHub username above to see their
                            profile and repositories.
                        </p>

                    </section>
                )}

        </div>
    );
};

export default Users;