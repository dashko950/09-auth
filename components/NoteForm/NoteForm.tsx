"use client";

import { useState } from "react";
import styles from "./NoteForm.module.css";

interface NoteFormProps {
  initialData?: {
    title: string;
    content: string;
    tag: string;
  };
  onSubmit: (data: { title: string; content: string; tag: string }) => void;
  isLoading?: boolean;
}

export default function NoteForm({
  initialData,
  onSubmit,
  isLoading = false,
}: NoteFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [tag, setTag] = useState(initialData?.tag || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, content, tag });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
          required
          placeholder="Enter note title"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="tag">Tag</label>
        <input
          id="tag"
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          className={styles.input}
          required
          placeholder="e.g., work, personal, ideas"
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={styles.textarea}
          rows={10}
          required
          placeholder="Write your note here..."
        />
      </div>

      <button
        type="submit"
        className={styles.submitButton}
        disabled={isLoading}
      >
        {isLoading ? "Saving..." : "Save Note"}
      </button>
    </form>
  );
}
