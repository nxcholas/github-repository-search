import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { SearchComponent } from "./components/SearchComponent";

// init tanstack client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchComponent />
    </QueryClientProvider>
  );
}

export default App;
