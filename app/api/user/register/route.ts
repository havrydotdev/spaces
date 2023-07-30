import { NextResponse } from "next/server";
import { addDoc } from "firebase/firestore";
import { users } from "@/app/data/collections";

export const POST = async (req: Request) => {
  const body = await req.json();

  await addDoc(users, {
    dirs: [],
    username: body.username,
    name: body.name,
    password: body.password,
  });

  return NextResponse.json({
    ok: true,
  });
};
