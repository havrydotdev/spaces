import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { User } from "@/types";

const users = collection(db, "users");

export const getUser = async (
  username: string | undefined,
  password: string | undefined
): Promise<User | null> => {
  if (username == undefined || password == undefined) {
    return null;
  }
  const q = query(
    users,
    where("username", "==", username),
    where("password", "==", password)
  );

  const response = await getDocs(q);

  const userData = response.docs[0].data();

  if (!userData) {
    return null;
  }

  return {
    id: userData.id,
    ...userData.data(),
  };
};
