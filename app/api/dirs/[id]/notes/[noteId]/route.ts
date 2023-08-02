import { options } from "@/app/api";
import { deleteNote, updateNote } from "@/app/data/notes";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const DELETE = async (
  req: Request,
  { params }: { params: { id: number; noteId: number } }
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

    await deleteNote(session.user!.id, params.id, params.noteId);

    return NextResponse.json({
      ok: true,
    });
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

export const PATCH = async (
  req: Request,
  { params }: { params: { id: number; noteId: number } }
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

    const body = await req.json();

    await updateNote(session.user!.id, params.id, params.noteId, body);

    return NextResponse.json({
      ok: true,
    });
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
