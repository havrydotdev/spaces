import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { options } from "..";
import { addDir, getAllDirs } from "@/app/data/dirs";

export const GET = async (req: Request) => {
  const session = await getServerSession(options);
  if (!session) {
    return NextResponse.json(
      {
        success: false,
        message: "You`re not logged in",
      },
      {
        status: 400,
      }
    );
  }

  const dirs = await getAllDirs(session.user!.id);

  return NextResponse.json(dirs);
};

export const POST = async (req: Request) => {
  const input = await req.json();
  const session = await getServerSession(options);
  if (!session) {
    return NextResponse.json(
      {
        success: false,
        message: "You`re not logged in",
      },
      {
        status: 400,
      }
    );
  }

  const res = await addDir(session.user!.id, {
    name: input.name,
    notes: [
      {
        title: "New Note",
        text: "Hello World!",
      },
    ],
  });

  return NextResponse.json({
    id: res,
  });
};
