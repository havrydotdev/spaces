"use client";
import type { Metadata } from "next";
import { sf_pro } from "@/app/fonts";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import { Directory, Note } from "@/types/data";
import useSWR from "swr";
import PlanetIcon from "@/public/planet.svg";
import PlusIcon from "@/public/plus.svg";
import { getCookie } from "cookies-next";
import styles from "./layout.module.css";
import NewNoteIcon from "@/public/new_note.svg";
import { useState } from "react";
import {
  addNewDir,
  addNewNote,
  deleteDirFromDB,
  deleteNoteFromDB,
} from "@/server";
import TrashIcon from "@/public/trash.svg";
import cn from "classnames";
import { useRouter } from "next/navigation";

export const metadata: Metadata = {
  title: "Notes page",
  description: "Fast and easy-to-use note taking website",
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function NotesLayout({ children }: { children: any }) {
  const { push } = useRouter();
  const [dirs, setDirs] = useState<Directory[]>([]);
  const { error, isLoading } = useSWR<Directory[]>("/api/dirs", fetcher, {
    onSuccess(data) {
      setDirs(data);
    },
  });

  const dir = getCookie("active_dir");

  const note = getCookie("active_note");

  let activeDir = 0;

  let activeNote = 0;
  if (dir !== undefined && dir !== null) {
    activeDir = parseInt(dir.toString());
  }

  if (note !== undefined && note !== null) {
    activeNote = parseInt(note.toString());
  }

  if (error)
    return (
      <html lang="en">
        <body className={sf_pro.className}>
          <div>{error.message}</div>
          <AuthProvider>{children}</AuthProvider>
        </body>
      </html>
    );

  const addNote = async () => {
    const newNote: Note = {
      title: "New note",
      text: "Hello World!",
    };

    setDirs((drs) =>
      drs.map((dr, i) =>
        i == activeDir
          ? {
              name: dr.name,
              notes: [...dr.notes, newNote],
            }
          : dr
      )
    );

    await addNewNote(activeDir, newNote);
  };

  const addDir = async () => {
    const newDir: Directory = {
      name: "New list",
      notes: [],
    };

    setDirs((drs) => [...drs, newDir]);

    await addNewDir(newDir);
  };

  const deleteDir = async (dirId: number) => {
    setDirs((drs) => drs.filter((dr, i) => i !== dirId));

    if (dirId == activeDir) {
      push("/notes/0");
    }

    await deleteDirFromDB(dirId);
  };

  const deleteNote = async (dirId: number, noteId: number) => {
    setDirs((drs) =>
      drs.map((dr, i) =>
        i === dirId
          ? {
              name: dr.name,
              notes: dr.notes.filter((note, i) => i !== noteId),
            }
          : dr
      )
    );

    if (dirId == activeDir) {
      push("/notes/0");
    }

    await deleteNoteFromDB(dirId, noteId);
  };

  return (
    <html lang="en">
      <body className={sf_pro.className}>
        <div className="flex">
          <div className="min-w-[414px] border-r-[1px] border-[#D4D4D4] border-solid h-max m-0">
            <PlanetIcon className="mt-[36px] ml-[42px]" />
            {isLoading ? (
              <div className={styles.load}></div>
            ) : (
              <>
                <div className="flex mt-[46px] w-[325px] ml-[42px] text-[18px] font-medium opacity-[0.5] text-[#242424] small-caps justify-between">
                  <h4>Lists</h4>
                  <div className="flex flex-col justify-center">
                    <button onClick={addDir}>
                      <PlusIcon className="cursor-pointer" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-5px mt-[16px] ml-[42px]">
                  {dirs.map((dir, index) => (
                    <a
                      className={cn(
                        "flex items-center text-[18px] h-[41px] w-[325px] rounded-lg text-[#242424] justify-between",
                        styles.dir,
                        {
                          ["bg-[#F8F8F8]"]: index === activeDir,
                        }
                      )}
                      key={index}
                      href={`/notes/${index}`}
                    >
                      <p className="ml-[10px]">{dir.name}</p>
                      <TrashIcon
                        className={`mr-[10px] opacity-0 transition-all cursor-pointer`}
                        onClick={() => deleteDir(index)}
                      />
                    </a>
                  ))}
                  <div className="flex justify-between text-[18px] font-medium small-caps opacity-[0.5] text-[#242424] mt-[48px]">
                    <h4>Notes</h4>
                  </div>
                  <div className="flex flex-col gap-5px mt-[16px]">
                    {dirs[activeDir]?.notes.map((note, index) => (
                      <div
                        className={cn(
                          "flex justify-between items-center h-[41px] w-[325px] rounded-lg",
                          styles.dir,
                          {
                            ["bg-[#F8F8F8]"]: index === activeNote,
                          }
                        )}
                        key={index}
                      >
                        <a
                          className={cn(
                            "flex justify-between items-center w-[90%] text-[18px] text-[#242424]"
                          )}
                          href={`/notes/${activeDir}/${index}`}
                        >
                          <p className="ml-[10px]">{note.title}</p>
                        </a>
                        <TrashIcon
                          className={`mr-[10px] opacity-0 transition-all cursor-pointer`}
                          onClick={() => deleteNote(activeDir, index)}
                        />
                      </div>
                    ))}
                    <button
                      className={`flex items-center text-[18px] h-[41px] w-[325px] rounded-lg text-[#242424] mt-[15px]`}
                      onClick={addNote}
                    >
                      <div className="flex gap-[10px] rounded-lg border-[1px] border-[#BEBEBE] h-[41px] w-[325px] items-center">
                        <NewNoteIcon className="ml-[10px]" />
                        <p className="text-[#BEBEBE] text-[20px] font-normal">
                          New note
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
          <AuthProvider>{children}</AuthProvider>
        </div>
      </body>
    </html>
  );
}
