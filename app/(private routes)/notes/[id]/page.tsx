"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api/clientApi";
import styles from "./page.module.css";

export default function NoteDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data: note, isLoading, error } = useQuery({
    queryKey: ["note", params.id],
    queryFn: () => fetchNoteById(params.id),
  });

  if (isLoading) {
    return (
      <main className={styles.mainContent}>
        <div className={styles.loading}>Loading note...</div>
      </main>
    );
  }

  if (error || !note) {
    return (
      <main className={styles.mainContent}>
        <div className={styles.error}>Note not found</div>
      </main>
    );
  }

  return (
    <main className={styles.mainContent}>
      <div className={styles.noteContainer}>
        <button onClick={() => router.back()} className={styles.backButton}>
          ← Back
        </button>
        <h1 className={styles.title}>{note.title}</h1>
        <span className={styles.tag}>{note.tag}</span>
        <p className={styles.content}>{note.content}</p>
        <div className={styles.meta}>
          <small>Created: {new Date(note.createdAt).toLocaleDateString()}</small>
          <small>Updated: {new Date(note.updatedAt).toLocaleDateString()}</small>
        </div>
      </div>
    </main>
  );
}
