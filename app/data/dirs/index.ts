import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { Directory } from "@/types/data";
import { users } from "../collections";

export const getAllDirs = async (
  userId: string
): Promise<Directory[] | null> => {
  const user = await getDoc(doc(users, userId));
  if (!user) {
    return null;
  }

  return user.data()!.dirs as Directory[];
};

export const getDirById = async (
  userId: string,
  dirId: number
): Promise<Directory | null> => {
  const user = await getDoc(doc(users, userId));
  if (!user) {
    return null;
  }

  return user.data()!.dirs[dirId] as Directory;
};

export const addDir = async (userId: string, dir: Directory): Promise<void> => {
  await updateDoc(doc(users, userId), {
    dirs: arrayUnion(dir),
  });
};

export const deleteDir = async (userId: string, dirId: number) => {
  const user = await getDoc(doc(users, userId));
  if (!user) {
    throw new Error("User does not exist");
  }

  const dirs = user.data()!.dirs;

  dirs.splice(dirId, 1);

  await updateDoc(doc(users, userId), {
    dirs: dirs,
  });
};
