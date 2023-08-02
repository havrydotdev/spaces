import { options } from "@/app/api";
import { getAllDirs, getDirById } from "@/app/data/dirs";
import { db, storage } from "@/app/data/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

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

    // get form data from request
    const formData = await req.formData();

    // get image from
    const file = formData.get("image") as File | null;
    if (!file) {
      return NextResponse.json({ error: "File is required." }, { status: 400 });
    }

    // required step (idk why)
    const buffer = Buffer.from(await file.arrayBuffer());

    const dirs = await getAllDirs(session.user!.id);
    if (dirs === null) {
      return NextResponse.json({
        message: "This user has no dirs",
      });
    }

    // get reference to image in storage
    const imageRef = ref(storage, `notes/${session.user?.id}.png`);
    await uploadBytes(imageRef, buffer);

    const downloadURL = await getDownloadURL(imageRef);

    dirs[params.id].notes[params.noteId].image = downloadURL;

    // set user's avatar to download link from storage
    await updateDoc(doc(db, "users", session.user!.id), {
      dirs: dirs,
    });

    return NextResponse.json({
      url: downloadURL,
    });
  } catch (e) {
    console.log(e);
  }
};
