"use client";

import { useState, useCallback } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import styles from "./SearchBox.module.css";

interface SearchBoxProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBox({
  onSearch,
  placeholder = "Search notes...",
}: SearchBoxProps) {
  const [query, setQuery] = useState("");

  const debouncedSearch = useDebounce((value: string) => {
    onSearch(value);
  }, 500);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setQuery(value);
      debouncedSearch(value);
    },
    [debouncedSearch],
  );

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchWrapper}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className={styles.searchInput}
        />
        {query && (
          <button
            onClick={handleClear}
            className={styles.clearButton}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}
