"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/clientApi";
import Link from "next/link";
import styles from "./page.module.css";

export default function FilterPage() {
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag");
  const search = searchParams.get("search");

  const { data: notes, isLoading } = useQuery({
    queryKey: ["notes", { tag, search }],
    queryFn: () => fetchNotes({ tag: tag || undefined, search: search || undefined }),
  });

  if (isLoading) {
    return (
      <div className={styles.loading}>
        Loading notes...
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {tag ? `Notes with tag: ${tag}` : search ? `Search: ${search}` : "All Notes"}
      </h1>
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
