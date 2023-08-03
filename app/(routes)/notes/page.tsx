"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { NotesContext } from "./layout";
import { updateNoteImage, updateNoteInDB } from "@/server";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import UploadIcon from "@/public/upload.svg";

const NotesPage = () => {
  const { push } = useRouter();
  const session = useSession();
  const [title, setTitle] = useState<string>("");
  const [text, setText] = useState<string>("");
  const context = useContext(NotesContext);
  useEffect(() => {
    if (session.status === "authenticated") {
      if (!context.isLoading) {
        if (context.dirs.length !== 0) {
          if (context.dirs.length - 1 >= context.activeDir) {
            if (context.dirs[context.activeDir].notes.length !== 0) {
              setTitle(
                context.dirs[context.activeDir].notes[context.activeNote].title
              );
              setText(
                context.dirs[context.activeDir].notes[context.activeNote].text
              );
            }
          }
        }
      }
    }
  }, [context, session]);

  useEffect(() => {
    if (session.status === "unauthenticated") {
      push("/auth/login");
    }
  }, [session]);

  if (context.isLoading || session.status === "loading") {
    return (
      <div className="mt-[95px] ml-[500px]">
        <div className="load"></div>
      </div>
    );
  }

  if (context.dirs.length == 0) {
    return <div>Create new dir to see notes here...</div>;
  }

  if (context.dirs.length - 1 < context.activeDir) {
    return <div>This list does not exist!</div>;
  }

  if (context.dirs[context.activeDir].notes.length == 0) {
    return <div>Create new note</div>;
  }

  const editHeader = async () => {
    // map over dirs
    context.setDirs((drs) =>
      drs.map((dr, i) =>
        // if id of dir === active dir id
        i === context.activeDir
          ? {
              // return dir with updated notes
              name: dr.name,
              // map over notes field of dir
              notes: dr.notes.map((note, i) =>
                // if note id === active note id
                i === context.activeNote
                  ? // return note with updated title
                    {
                      title: title,
                      text: note.text,
                      image: note.image,
                    }
                  : // or note
                    note
              ),
            }
          : dr
      )
    );

    await updateNoteInDB(context.activeDir, context.activeNote, {
      title: title,
    });
  };

  const editText = async () => {
    // map over dirs
    context.setDirs((drs) =>
      drs.map((dr, i) =>
        // if id of dir === active dir id
        i === context.activeDir
          ? {
              // return dir with updated notes
              name: dr.name,
              // map over notes field of dir
              notes: dr.notes.map((note, i) =>
                // if note id === active note id
                i === context.activeNote
                  ? // return note with updated title
                    {
                      title: note.title,
                      text: text,
                      image: note.image,
                    }
                  : // or note
                    note
              ),
            }
          : dr
      )
    );

    await updateNoteInDB(context.activeDir, context.activeNote, {
      text: text,
    });
  };

  const handleChange = async (event: any) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      const body = new FormData();
      body.append("image", i);

      const res = await updateNoteImage(
        context.activeDir,
        context.activeNote,
        body
      );

      const url = (await res.json()).url;

      context.setDirs((dirs) =>
        // map through dirs
        dirs.map((dir, id) =>
          // id dir.id === active dir id
          id === context.activeDir
            ? {
                name: dir.name,
                // return dir with updated notes
                notes: dir.notes.map((note, idx) =>
                  // if note id === active note id
                  idx === context.activeNote
                    ? {
                        title: note.title,
                        text: note.text,
                        // return note with updated image
                        image: url,
                      }
                    : note
                ),
              }
            : dir
        )
      );
    }
  };

  return (
    <main className="ml-[44px] w-full">
      <div className="flex text-[18px] small-caps font-medium mt-[54px]">
        <h2 className="opacity-[0.20000000298023224]">
          {context.dirs[context.activeDir]?.name}&nbsp;/&nbsp;
        </h2>
        <h2 className="opacity-[0.5]">
          {context.dirs[context.activeDir]?.notes[context.activeNote].title}
        </h2>
      </div>
      <div className="flex gap-[15px] mt-[27px] text-[40px] text-[#242424] font-semibold items-center group w-full">
        <input
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
          onBlur={() => editHeader()}
          className="w-full mr-[40px] focus:outline-none"
        />
      </div>
      <div className="text-[#242424] text-[20px] w-full">
        <textarea
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
          onBlur={() => editText()}
          className="w-full focus:outline-none mt-[30px]"
          cols={30}
          rows={10}
        />
      </div>
      {context.dirs[context.activeDir].notes[context.activeNote].image ===
        undefined ||
      context.dirs[context.activeDir].notes[context.activeNote].image === "" ? (
        <div className="max-w-[330px] mt-[40px]">
          <UploadIcon className="w-6 h-6 text-gray-600" />
          <span className="font-medium text-gray-600">
            Drop files to Add Image, or{" "}
            <span className="text-[rgb(37_99_235)] underline">browse</span>
          </span>
          <input
            type="file"
            name="image"
            className="hidden"
            onChange={handleChange}
          />
        </div>
      ) : (
        <div>
          <img
            width={200}
            src={
              context.dirs[context.activeDir].notes[context.activeNote].image!
            }
            alt="Note Image"
          />
        </div>
      )}
    </main>
  );
};

export default NotesPage;
