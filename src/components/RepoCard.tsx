import type { Repo } from "../lib/types";

export function RepoCard({ repo }: { repo: Repo }) {
  return (
    <div
      key={repo.id}
      className="w-full border border-gray-300 rounded-md px-4 py-6 flex flex-col gap-2"
    >
      <a
        className="text-blue-600 font-semibold hover:underline"
        href={repo.html_url}
        target="_blank"
      >
        {repo.full_name}
      </a>
      <p>{repo.description}</p>
      <div className="repo-stats flex gap-2">
        <span className="text-xs text-gray-400">
          {repo.stargazers_count} stars
        </span>
        <span className="text-xs text-gray-400">•</span>
        <span className="text-xs text-gray-400">
          Updated on {formatDate(repo.updated_at)}
        </span>
      </div>
    </div>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default RepoCard;
