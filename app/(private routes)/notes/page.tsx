"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/clientApi";
import styles from "./page.module.css";

export default function NotesPage() {
  const {
    data: notes,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notes"],
    queryFn: () => fetchNotes(),
  });

  if (isLoading) {
    return (
      <main className={styles.mainContent}>
        <div className={styles.loading}>Loading notes...</div>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.mainContent}>
        <div className={styles.error}>Error loading notes</div>
      </main>
    );
  }

  return (
    <main className={styles.mainContent}>
      <div className={styles.notesContainer}>
        <h1 className={styles.title}>My Notes</h1>
        {notes && notes.length > 0 ? (
          <div className={styles.notesGrid}>
            {notes.map((note) => (
              <div key={note.id} className={styles.noteCard}>
                <h2 className={styles.noteTitle}>{note.title}</h2>
                <p className={styles.noteContent}>
                  {note.content.substring(0, 100)}...
                </p>
                <span className={styles.noteTag}>{note.tag}</span>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.empty}>
            No notes found. Create your first note!
          </p>
        )}
      </div>
    </main>
  );
}
