"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";

interface NotePreviewClientProps {
  id: string;
  onClose: () => void;
}

export default function NotePreviewClient({
  id,
  onClose,
}: NotePreviewClientProps) {
  const router = useRouter();
  const { data: note, isLoading } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  const handleViewFull = () => {
    onClose();
    router.push(`/notes/${id}`);
  };

  if (isLoading) {
    return (
      <div className="modal-loading">
        <div className="loading-spinner"></div>
        <p>Loading preview...</p>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="modal-error">
        <p>Note not found</p>
        <button onClick={onClose}>Close</button>
      </div>
    );
  }

  return (
    <div className="note-preview">
      <h2 className="preview-title">{note.title}</h2>
      <span className="preview-tag">{note.tag}</span>
      <p className="preview-content">
        {note.content.length > 200
          ? `${note.content.substring(0, 200)}...`
          : note.content}
      </p>
      <div className="preview-actions">
        <button onClick={handleViewFull} className="view-full-button">
          View Full Note
        </button>
        <button onClick={onClose} className="close-preview-button">
          Close
        </button>
      </div>
    </div>
  );
}
