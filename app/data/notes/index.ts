import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { Note } from "@/types/data";
import { users } from "../collections";

export const getAllNotesFromDir = async (
  userId: string,
  dirId: number
): Promise<Note[] | null> => {
  const response = await getDoc(doc(users, userId));
  if (!response) {
    return null;
  }

  const notes = response.data()!.dirs[dirId].notes;

  return notes as Note[];
};

export const getNoteById = async (
  userId: string,
  dirId: number,
  noteId: number
): Promise<Note | null> => {
  const response = await getDoc(doc(users, userId));
  if (!response) {
    return null;
  }

  const notes = response.data()!.dirs[dirId].notes;

  return notes[noteId] as Note;
};

export const addNote = async (userId: string, dirId: number, note: Note) => {
  const userRef = doc(users, userId);
  const response = await getDoc(userRef);
  if (!response) {
    return null;
  }

  const dirs = response.data()!.dirs;

  dirs[dirId].notes.push(note);
  await updateDoc(userRef, {
    dirs: dirs,
  });
};
