"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/clientApi";
import Link from "next/link";
import styles from "./page.module.css";

export default function FilterSidebar() {
  const { data: notes } = useQuery({
    queryKey: ["notes"],
    queryFn: () => fetchNotes(),
  });

  const tags = notes ? Array.from(new Set(notes.map((note) => note.tag))) : [];

  return (
    <aside className={styles.sidebar}>
      <h3 className={styles.sidebarTitle}>Tags</h3>
      <ul className={styles.tagList}>
        {tags.map((tag) => (
          <li key={tag}>
            <Link href={`/notes/filter?tag=${encodeURIComponent(tag)}`} className={styles.tagLink}>
              #{tag}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
