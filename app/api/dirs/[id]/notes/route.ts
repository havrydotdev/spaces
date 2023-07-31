import { options } from "@/app/api";
import { addNote, getAllNotesFromDir } from "@/app/data/notes";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (
  req: Request,
  { params }: { params: { id: number } }
) => {
  try {
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

    const notes = await getAllNotesFromDir(session.user!.id, params.id);
    if (!notes) {
      return NextResponse.json(
        {
          message: "There is no notes in this dir",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(notes);
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({
        message: e.message,
      });
    } else {
      return NextResponse.json({
        message: "Something went wrong",
      });
    }
  }
};

export const POST = async (
  req: Request,
  { params }: { params: { id: number } }
) => {
  const note = await req.json();
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

  await addNote(session.user!.id, params.id, note);

  return NextResponse.json({
    ok: true,
  });
};
