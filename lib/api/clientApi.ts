import { apiClient } from "./api";
import { User } from "@/types/user";
import { Note } from "@/types/note";

// Auth endpoints
export const register = async (
  email: string,
  password: string,
): Promise<User> => {
  const response = await apiClient.post("/auth/register", { email, password });
  return response.data;
};

export const login = async (email: string, password: string): Promise<User> => {
  const response = await apiClient.post("/auth/login", { email, password });
  return response.data;
};

export const logout = async (): Promise<void> => {
  await apiClient.post("/auth/logout");
};

export const checkSession = async (): Promise<User | null> => {
  try {
    const response = await apiClient.get("/auth/session");
    return response.data;
  } catch {
    return null;
  }
};

// User endpoints
export const getMe = async (): Promise<User> => {
  const response = await apiClient.get("/users/me");
  return response.data;
};

export const updateMe = async (userData: Partial<User>): Promise<User> => {
  const response = await apiClient.patch("/users/me", userData);
  return response.data;
};

// Notes endpoints
export const fetchNotes = async (params?: {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
}): Promise<Note[]> => {
  const response = await apiClient.get("/notes", { params });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await apiClient.get(`/notes/${id}`);
  return response.data;
};

export const createNote = async (
  note: Omit<Note, "id" | "createdAt" | "updatedAt">,
): Promise<Note> => {
  const response = await apiClient.post("/notes", note);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await apiClient.delete(`/notes/${id}`);
  return response.data;
};
