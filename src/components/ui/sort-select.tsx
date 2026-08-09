"use client";

export interface SortOption<T> {
  label: string;
  compare: (a: T, b: T) => number;
}

export function SortSelect<T>({
  options,
  index,
  onChange,
  className = "",
}: {
  options: SortOption<T>[];
  index: number;
  onChange: (index: number) => void;
  className?: string;
}) {
  return (
    <select
      value={index}
      onChange={(e) => onChange(Number(e.target.value))}
      aria-label="Sort by"
      className={`rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring ${className}`}
    >
      {options.map((option, i) => (
        <option key={option.label} value={i}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
