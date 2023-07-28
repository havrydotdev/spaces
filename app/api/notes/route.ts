import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { options } from "..";

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

  return NextResponse.json({
    success: true,
    session: session.user,
  });
};
