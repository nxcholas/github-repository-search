import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useSearchRepositories } from "../hooks/useSearchRepositories";

import RepoCard from "./RepoCard";
import { RepoCardSkeleton } from "./RepoCardSkeleton";
import { FilterSelect } from "./FilterSelect";

import type { sortOption, orderOption } from "../lib/types";

const perPageOptions = [
  { value: "10", label: "10" },
  { value: "25", label: "25" },
  { value: "50", label: "50" },
];

const sortOptions = [
  { value: "", label: "Best Match" },
  { value: "stars", label: "Stars" },
  { value: "updated", label: "Updated" },
];

const orderOptions = [
  { value: "asc", label: "Ascending" },
  { value: "desc", label: "Descending" },
];

export function SearchComponent() {
  const [text, setText] = useState<string>("");
  const [debouncedText] = useDebounce(text, 500);
  const [sort, setSort] = useState<sortOption>("stars");
  const [order, setOrder] = useState<orderOption>("desc");
  const [perPage, setPerPage] = useState<number>(10);

  const { data: repositories, isLoading } = useSearchRepositories({
    q: debouncedText,
    sort,
    order,
    per_page: perPage,
  });

  return (
    <div className="flex flex-col gap-4 justify-center items-left mt-8 mx-[30%]">
      <h1 className="text-5xl font-bold tracking-tighter">
        GitHub Repository Search
      </h1>
      <input
        className="border border-gray-300 rounded-sm p-2 focus:outline-0 focus:bg-sky-100"
        type="text"
        onChange={(e) => setText(e.target.value)}
      />
      <div className="btn-group flex gap-8">
        <FilterSelect
          label="Items per page"
          value={String(perPage)}
          options={perPageOptions}
          onChange={(value) => setPerPage(Number(value))}
        />
        <FilterSelect
          label="Sort by"
          value={sort ?? ""}
          options={sortOptions}
          onChange={(value) =>
            setSort(value === "" ? undefined : (value as sortOption))
          }
        />
        <FilterSelect
          label="Order by"
          value={order ?? ""}
          options={orderOptions}
          onChange={(value) => setOrder(value as orderOption)}
        />
      </div>
      {isLoading && Array.from({ length: Math.min(perPage, 10) }, (_, i) => (
        <RepoCardSkeleton key={i} />
      ))}

      <div className="data flex flex-col gap-4 ">
        {repositories?.map((repo) => (
          <RepoCard repo={repo} />
        ))}
      </div>
    </div>
  );
}
