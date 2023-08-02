"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { NotesContext } from "./layout";
import { updateNoteInDB } from "@/server";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const NotesPage = () => {
  const { push } = useRouter();
  const session = useSession({
    required: true,
    onUnauthenticated() {
      push("/auth/login");
    },
  });
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

  if (context.isLoading || session.status === "loading") {
    return <div>Loading...</div>;
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

  return (
    <>
      <div className="ml-[44px] w-full">
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
            cols={40}
            rows={20}
          />
        </div>
      </div>
    </>
  );
};

export default NotesPage;
