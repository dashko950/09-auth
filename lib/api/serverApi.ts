import { cookies } from "next/headers";
import { User } from "@/types/user";
import { Note } from "@/types/note";

const API_URL = process.env.NEXT_PUBLIC_API_URL + "/api";

async function serverFetch<T>(
  endpoint: string,
  options?: RequestInit,
): Promise<T> {
  const cookieStore = cookies();
  const cookieHeader = cookieStore.toString();

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}

export const checkSession = async (): Promise<User | null> => {
  try {
    return await serverFetch<User>("/auth/session");
  } catch {
    return null;
  }
};

export const getMe = async (): Promise<User> => {
  return await serverFetch<User>("/users/me");
};

export const fetchNotes = async (params?: {
  search?: string;
  page?: number;
  perPage?: number;
  tag?: string;
}): Promise<Note[]> => {
  const queryParams = new URLSearchParams();
  if (params?.search) queryParams.append("search", params.search);
  if (params?.page) queryParams.append("page", params.page.toString());
  if (params?.perPage) queryParams.append("perPage", params.perPage.toString());
  if (params?.tag) queryParams.append("tag", params.tag);

  const queryString = queryParams.toString();
  const endpoint = `/notes${queryString ? `?${queryString}` : ""}`;

  return await serverFetch<Note[]>(endpoint);
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  return await serverFetch<Note>(`/notes/${id}`);
};
