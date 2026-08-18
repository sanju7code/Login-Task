const API_URL = "https://api.github.com";

export interface GithubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
  html_url: string;
}

export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  html_url: string;
}

const request = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("GitHub user not found.");
    }

    if (response.status === 403) {
      throw new Error(
        "GitHub API rate limit exceeded. Please try again later."
      );
    }

    throw new Error("Unable to fetch data from GitHub.");
  }

  return response.json();
};

export const getGithubUser = (username: string) =>
  request<GithubUser>(
    `${API_URL}/users/${encodeURIComponent(username)}`
  );

export const getGithubRepos = (username: string) =>
  request<GithubRepo[]>(
    `${API_URL}/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`
  );