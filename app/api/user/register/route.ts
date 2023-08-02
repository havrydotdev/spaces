import { NextResponse } from "next/server";
import { addDoc } from "firebase/firestore";
import { users } from "@/app/data/collections";

export const POST = async (req: Request) => {
  const body = await req.json();

  await addDoc(users, {
    dirs: [
      {
        name: "Edit Me!",
        notes: [
          {
            title: "Your First Note",
            text: "Hello World! Edit me to start using Spaces!",
          },
        ],
      },
    ],
    username: body.username,
    name: body.name,
    password: body.password,
    email: body.email,
  });

  return NextResponse.json({
    ok: true,
  });
};
