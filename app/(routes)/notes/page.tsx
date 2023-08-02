"use client";
import { useContext, useEffect, useState } from "react";
import { NotesContext } from "./layout";
import { updateNoteInDB } from "@/server";

const NotesPage = () => {
  const context = useContext(NotesContext);
  if (context.isLoading) {
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

  const [newHeader, setNewHeader] = useState<string>(
    context.dirs[context.activeDir].notes[context.activeNote].title
  );

  const [newText, setNewText] = useState<string>(
    context.dirs[context.activeDir].notes[context.activeNote].text
  );

  useEffect(() => {
    setNewHeader(
      context.dirs[context.activeDir].notes[context.activeNote].title
    );
  }, [context.activeNote, context.activeDir]);

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
                      title: newHeader,
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
      title: newHeader,
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
                      text: newText,
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
      text: newText,
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
            value={newHeader}
            onChange={(e) => setNewHeader(e.currentTarget.value)}
            onBlur={() => editHeader()}
            className="w-full mr-[40px] focus:outline-none"
          />
        </div>
        <div className="text-[#242424] text-[20px] w-full">
          <textarea
            value={newText}
            onChange={(e) => setNewText(e.currentTarget.value)}
            onBlur={() => editText()}
            className="w-full focus:outline-none mt-[30px]"
            cols={50}
            rows={10}
          />
        </div>
      </div>
    </>
  );
};

export default NotesPage;
