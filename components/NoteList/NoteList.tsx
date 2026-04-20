"use client";

import Link from "next/link";
import { Note } from "@/types/note";
import styles from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
  onDelete?: (id: string) => void;
  isLoading?: boolean;
}

export default function NoteList({
  notes,
  onDelete,
  isLoading = false,
}: NoteListProps) {
  if (isLoading) {
    return <div className={styles.loading}>Loading notes...</div>;
  }

  if (notes.length === 0) {
    return (
      <div className={styles.empty}>
        No notes found. Create your first note!
      </div>
    );
  }

  return (
    <div className={styles.notesGrid}>
      {notes.map((note) => (
        <div key={note.id} className={styles.noteCard}>
          <Link href={`/notes/${note.id}`} className={styles.noteLink}>
            <h2 className={styles.noteTitle}>{note.title}</h2>
            <p className={styles.noteContent}>
              {note.content.substring(0, 100)}
              {note.content.length > 100 && "..."}
            </p>
            <div className={styles.noteFooter}>
              <span className={styles.noteTag}>{note.tag}</span>
              <span className={styles.noteDate}>
                {new Date(note.createdAt).toLocaleDateString()}
              </span>
            </div>
          </Link>
          {onDelete && (
            <button
              onClick={() => onDelete(note.id)}
              className={styles.deleteButton}
              aria-label="Delete note"
            >
              ×
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
