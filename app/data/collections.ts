import { collection } from "firebase/firestore";
import { db } from "./firebase";

export const users = collection(db, "users");

export const notes = collection(db, "notes");
