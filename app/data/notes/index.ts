import { getDocs } from "firebase/firestore";
import { notes } from "../collections";

export const getAllNotesFromDir = async (
  userId: string,
  dirId: number
): Promise<any | null> => {
  const response = await getDocs(notes);

  const notesData = response.docs[0];

  if (!notesData.data()) {
    return null;
  }

  const result = notesData;

  return {
    ...notesData.data(),
  };
};
