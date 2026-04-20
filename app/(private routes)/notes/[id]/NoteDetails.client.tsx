"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api/clientApi";

interface NoteDetailsClientProps {
  id: string;
}

export default function NoteDetailsClient({ id }: NoteDetailsClientProps) {
  const router = useRouter();
  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading note...</p>
      </div>
    );
  }

  if (error || !note) {
    return (
      <div className="error-container">
        <p>Note not found</p>
        <button onClick={() => router.back()}>Go Back</button>
      </div>
    );
  }

  return (
    <div className="note-container">
      <button onClick={() => router.back()} className="back-button">
        ← Back
      </button>
      <h1 className="note-title">{note.title}</h1>
      <span className="note-tag">{note.tag}</span>
      <p className="note-content">{note.content}</p>
      <div className="note-meta">
        <small>Created: {new Date(note.createdAt).toLocaleDateString()}</small>
        <small>Updated: {new Date(note.updatedAt).toLocaleDateString()}</small>
      </div>
    </div>
  );
}
