import { useState } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { Octokit } from "octokit";

// init octokit
const octokit = new Octokit({
  // change later to blank
  auth: import.meta.env.VITE_GH_TOKEN,
});

// init tanstack client
const queryClient = new QueryClient();

// hook for searching repositories
export function useSearchRepositories(searchTerm: string) {
  return useQuery({
    queryKey: ["searchRepos", searchTerm],
    queryFn: async () => {
      if (!searchTerm) return [];

      const { data } = await octokit.request("GET /search/repositories", {
        q: searchTerm,
        sort: "stars",
        order: "desc",
        per_page: 10,
      });
      console.log("github response:", data.items);
      return data.items;
    },
  });
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchComponent />
    </QueryClientProvider>
  );
}

function SearchComponent() {
  const [text, setText] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("")
  const { data: repositories } = useSearchRepositories(searchTerm);

  return (
    <div>
      <input
        className="border"
        type="text"
        onChange={(e) => setText(e.target.value)}
      />
      <button className="border rounded-md" onClick={() => setSearchTerm(text)}>Search</button>
    </div>
  );
}

export default App;
