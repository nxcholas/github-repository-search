export function RepoCardSkeleton() {
  return (
    <div className="w-full border border-gray-300 rounded-md px-4 py-6 flex flex-col gap-2 animate-pulse">
      {/* full_name link */}
      <div className="h-5 w-1/3 rounded bg-gray-200" />

      {/* description */}
      <div className="h-4 w-3/4 rounded bg-gray-200" />

      {/* stats row */}
      <div className="flex gap-2">
        <div className="h-3 w-16 rounded bg-gray-200" />
        <div className="h-3 w-2 rounded bg-gray-200" />
        <div className="h-3 w-32 rounded bg-gray-200" />
      </div>
    </div>
  );
}
