"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/clientApi";
import Link from "next/link";
import styles from "./page.module.css";

export default function FilterCatchAllPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const filterValue = params.slug.join("/");

  const { data: notes, isLoading } = useQuery({
    queryKey: ["notes", { filter: filterValue }],
    queryFn: () => fetchNotes({ search: filterValue }),
  });

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Filter: {filterValue}</h1>
      {notes && notes.length > 0 ? (
        <div className={styles.notesGrid}>
          {notes.map((note) => (
            <Link href={`/notes/${note.id}`} key={note.id} className={styles.noteCard}>
              <h2 className={styles.noteTitle}>{note.title}</h2>
              <p className={styles.noteContent}>{note.content.substring(0, 100)}...</p>
              <span className={styles.noteTag}>{note.tag}</span>
            </Link>
          ))}
        </div>
      ) : (
        <p className={styles.empty}>No notes found</p>
      )}
    </div>
  );
}
