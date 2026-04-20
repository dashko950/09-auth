"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api/clientApi";
import Link from "next/link";

interface NotesClientProps {
  filterValue: string;
}

export default function NotesClient({ filterValue }: NotesClientProps) {
  const { data: notes, isLoading } = useQuery({
    queryKey: ["notes", { filter: filterValue }],
    queryFn: () => fetchNotes({ search: filterValue }),
  });

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="notes-container">
      <h1 className="title">Filter: {filterValue}</h1>
      {notes && notes.length > 0 ? (
        <div className="notes-grid">
          {notes.map((note) => (
            <Link
              href={`/notes/${note.id}`}
              key={note.id}
              className="note-card"
            >
              <h2 className="note-title">{note.title}</h2>
              <p className="note-content">
                {note.content.substring(0, 100)}...
              </p>
              <span className="note-tag">{note.tag}</span>
            </Link>
          ))}
        </div>
      ) : (
        <p className="empty">No notes found</p>
      )}
    </div>
  );
}
