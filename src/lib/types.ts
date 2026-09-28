export type sortOption =
  | "updated"
  | "stars"
  | "forks"
  | "help-wanted-issues"
  | undefined;

export type orderOption = "desc" | "asc" | undefined;

export type SearchParams = {
  q: string;
  sort: sortOption;
  order: orderOption;
  per_page: number;
};

export type Repo = {
  id: number;
  full_name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  updated_at: string;
};