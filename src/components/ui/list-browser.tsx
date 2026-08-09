"use client";

import { useMemo, useState } from "react";
import { SearchInput } from "./search-input";
import { SortSelect, type SortOption } from "./sort-select";
import { Pagination } from "./pagination";

export type { SortOption };

// Generic list controller: free-text search (which also serves as the
// filter, since none of the current data models have a categorical field
// to filter by yet), sort, and pagination, all in local component state.
// Meant to be reused anywhere in the app that renders a searchable list —
// currently the subjects list and each subject's topics list.
export function ListBrowser<T>({
  items,
  getKey,
  getSearchText,
  sortOptions,
  renderItem,
  pageSize = 6,
  searchPlaceholder = "Search…",
  emptyMessage = "No results found.",
  gridClassName = "grid gap-4 sm:grid-cols-2",
}: {
  items: T[];
  getKey: (item: T) => string;
  getSearchText: (item: T) => string;
  sortOptions: SortOption<T>[];
  renderItem: (item: T) => React.ReactNode;
  pageSize?: number;
  searchPlaceholder?: string;
  emptyMessage?: string;
  gridClassName?: string;
}) {
  const [query, setQuery] = useState("");
  const [sortIndex, setSortIndex] = useState(0);
  const [page, setPage] = useState(1);

  const filteredAndSorted = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q ? items.filter((item) => getSearchText(item).toLowerCase().includes(q)) : items;
    const compare = sortOptions[sortIndex]?.compare;
    return compare ? [...filtered].sort(compare) : filtered;
  }, [items, query, sortIndex, getSearchText, sortOptions]);

  const totalPages = Math.max(1, Math.ceil(filteredAndSorted.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filteredAndSorted.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  function handleQueryChange(value: string) {
    setQuery(value);
    setPage(1);
  }

  function handleSortChange(index: number) {
    setSortIndex(index);
    setPage(1);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput
          value={query}
          onChange={handleQueryChange}
          placeholder={searchPlaceholder}
          className="w-full sm:max-w-xs"
        />
        {sortOptions.length > 1 && (
          <SortSelect options={sortOptions} index={sortIndex} onChange={handleSortChange} />
        )}
      </div>

      {pageItems.length === 0 ? (
        <p className="text-sm text-foreground/60">{emptyMessage}</p>
      ) : (
        <div className={gridClassName}>
          {pageItems.map((item) => (
            <div key={getKey(item)} className="contents">
              {renderItem(item)}
            </div>
          ))}
        </div>
      )}

      <Pagination page={currentPage} totalPages={totalPages} onChange={setPage} />
    </div>
  );
}
