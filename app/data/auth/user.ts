import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { users } from "..";

export const getUser = async (
  username: string | undefined,
  password: string | undefined
): Promise<any | null> => {
  if (username == undefined || password == undefined) {
    return null;
  }
  const q = query(
    users,
    where("username", "==", username),
    where("password", "==", password)
  );

  const response = await getDocs(q);

  const userData = response.docs[0];

  if (!userData.data()) {
    console.log("data is null");
    return null;
  }

  return {
    id: userData.id,
    ...userData.data(),
  };
};
