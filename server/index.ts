import { Directory, Note } from "@/types/data";

export const registerUser = async (user: {
  username: string;
  password: string;
  name: string;
  email: string;
}): Promise<Response> => {
  const res = await fetch("/api/user/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });

  return res;
};

export const addNewNote = async (
  dirId: number,
  note: Note
): Promise<Response> => {
  const res = await fetch(`/api/dirs/${dirId}/notes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });

  return res;
};

export const addNewDir = async (dir: Directory): Promise<Response> => {
  const res = await fetch("/api/dirs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dir),
  });

  return res;
};

export const deleteDirFromDB = async (dirId: number): Promise<Response> => {
  const res = await fetch(`/api/dirs/${dirId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  return res;
};

export const deleteNoteFromDB = async (
  dirId: number,
  noteId: number
): Promise<Response> => {
  const res = await fetch(`/api/dirs/${dirId}/notes/${noteId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  return res;
};

export const updateNoteInDB = async (
  dirId: number,
  noteId: number,
  body: any
) => {
  const res = await fetch(`/api/dirs/${dirId}/notes/${noteId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return res;
};

export const updateDirInDB = async (dirId: number, name: string) => {
  const res = await fetch(`/api/dirs/${dirId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name,
    }),
  });

  return res;
};

export const updateNoteImage = async (
  dirId: number,
  noteId: number,
  body: any
): Promise<Response> => {
  const res = await fetch(`/api/dirs/${dirId}/notes/${noteId}/image`, {
    method: "PATCH",
    body: body,
  });

  return res;
};
