export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
}

export type NoteTag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export interface CreateNoteRequest {
  title: string;
  content: string;
  tag: NoteTag;
}

// export interface UpdateNoteRequest {
//   id: string;
//   title: string;
//   content: string;
//   tag: NoteTag;
//   updatedAt: string;
// }
