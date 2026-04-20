import { create } from "zustand";
import { Note } from "@/types/note";

interface NoteStore {
  notes: Note[];
  currentPage: number;
  totalPages: number;
  searchQuery: string;
  selectedTag: string | null;
  setNotes: (notes: Note[]) => void;
  setCurrentPage: (page: number) => void;
  setTotalPages: (pages: number) => void;
  setSearchQuery: (query: string) => void;
  setSelectedTag: (tag: string | null) => void;
  addNote: (note: Note) => void;
  removeNote: (id: string) => void;
  updateNote: (id: string, updatedNote: Partial<Note>) => void;
}

export const useNoteStore = create<NoteStore>()((set) => ({
  notes: [],
  currentPage: 1,
  totalPages: 1,
  searchQuery: "",
  selectedTag: null,
  setNotes: (notes) => set({ notes }),
  setCurrentPage: (currentPage) => set({ currentPage }),
  setTotalPages: (totalPages) => set({ totalPages }),
  setSearchQuery: (searchQuery) => set({ searchQuery, currentPage: 1 }),
  setSelectedTag: (selectedTag) => set({ selectedTag, currentPage: 1 }),
  addNote: (note) => set((state) => ({ notes: [note, ...state.notes] })),
  removeNote: (id) =>
    set((state) => ({ notes: state.notes.filter((n) => n.id !== id) })),
  updateNote: (id, updatedNote) =>
    set((state) => ({
      notes: state.notes.map((n) =>
        n.id === id ? { ...n, ...updatedNote } : n,
      ),
    })),
}));
