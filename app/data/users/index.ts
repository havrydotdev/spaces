import { getDocs, query, where } from "firebase/firestore";
import { users } from "../collections";
import { User } from "next-auth";

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

/**
 * Returns user with passed email or null if user does not exist
 * @param email user's `email`
 * @returns {User} user
 */
export const getUserByEmail = async (
  email: string | undefined
): Promise<User | null> => {
  if (!email) {
    throw new Error("email is undefined");
  }

  const q = query(users, where("email", "==", email));

  const response = await getDocs(q);

  const userData = response.docs[0];

  if (!userData) {
    return null;
  }

  return {
    id: userData.id,
    name: userData.data().username,
    username: userData.data().username,
    image: userData.data().avatar,
    email: userData.data().email,
  };
};
