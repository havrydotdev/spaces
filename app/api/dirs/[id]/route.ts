import { getServerSession } from "next-auth";
import { options } from "../..";
import { NextResponse } from "next/server";
import { deleteDir, getDirById, updateDir } from "@/app/data/dirs";

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

    const dir = await getDirById(session.user!.id, params.id);
    if (!dir) {
      return NextResponse.json(
        {
          message: "Directory does not exist",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json({
      dir: dir,
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

export const DELETE = async (
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

    await deleteDir(session.user!.id, params.id);
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

    await updateDir(session.user!.id, params.id, body.name);

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
