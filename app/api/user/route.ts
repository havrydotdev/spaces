import { getServerSession } from "next-auth";
import { options } from "..";
import { NextResponse } from "next/server";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "@/app/data/firebase";
import { doc, updateDoc } from "firebase/firestore";

export const PATCH = async (req: Request) => {
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
    const file = formData.get("avatar") as File | null;
    if (!file) {
      return NextResponse.json({ error: "File is required." }, { status: 400 });
    }

    // required step (idk why)
    const buffer = Buffer.from(await file.arrayBuffer());

    // get reference to image in storage
    const imageRef = ref(storage, `notes/${session.user?.id}.png`);
    await uploadBytes(imageRef, buffer).then(async () => {
      const downloadURL = await getDownloadURL(imageRef);

      // set user's avatar to donload link from storage
      await updateDoc(doc(db, "notes", params.id), {
        image: downloadURL,
      });
    });

    return NextResponse.json({
      ok: true,
    });
  } catch (e) {
    console.log(e);
  }
};
