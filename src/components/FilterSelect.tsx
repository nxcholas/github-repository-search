type FilterOption = {
  value: string;
  label: string;
};

type FilterSelectProps = {
  label: string;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
};

export function FilterSelect({
  label,
  value,
  options,
  onChange,
}: FilterSelectProps) {
  const selected = options.find((option) => option.value === value);

  return (
    <div className="relative inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-50 px-3 py-1.5 text-sm text-gray-800">
      <span>{label}</span>
      <span className="font-medium">{selected?.label ?? value}</span>
      <svg
        className="h-4 w-4 text-gray-500"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M6 8l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <select
        aria-label={label}
        value={value}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
