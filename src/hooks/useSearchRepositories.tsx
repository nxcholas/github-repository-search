import { useQuery } from "@tanstack/react-query";
import type { SearchParams } from "../lib/types";
import { Octokit } from "octokit";

// init octokit
const octokit = new Octokit({
  // change later to blank
  auth: import.meta.env.VITE_GH_TOKEN,
});

export function useSearchRepositories(params: SearchParams) {
  return useQuery({
    queryKey: ["searchRepos", params],
    queryFn: async () => {
      const { data } = await octokit.request("GET /search/repositories", {
        q: params.q,
        sort: params.sort,
        order: params.order,
        per_page: params.per_page,
      });
      console.log("github response:", data.items);
      return data.items;
    },
    enabled: params.q.length > 0,
  });
}