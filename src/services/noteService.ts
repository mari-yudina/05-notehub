import axios from "axios";
import type { Note, NoteTag } from "../types/note";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteRequest {
  title: string;
  content: string;
  tag: NoteTag;
}

const token = import.meta.env.VITE_NOTEHUB_TOKEN;
axios.defaults.baseURL = "https://notehub-public.goit.study/api";

export const fetchNotes = async (
  page: number = 1,
  perPage: number = 12,
  searchValue: string
): Promise<FetchNotesResponse> => {
  const res = await axios.get<FetchNotesResponse>("/notes", {
    params: { page, perPage, search: searchValue },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const createNote = async (data: CreateNoteRequest) => {
  const res = await axios.post<Note>("/notes", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const deleteNote = async (noteId: string) => {
  await axios.delete<Note>(`/notes/${noteId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
