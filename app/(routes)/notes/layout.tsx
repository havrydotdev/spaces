"use client";
import { sf_pro } from "@/app/fonts";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import { Directory, Note } from "@/types/data";
import useSWR from "swr";
import PlanetIcon from "@/public/planet.svg";
import PlusIcon from "@/public/plus.svg";
import { getCookie, setCookie } from "cookies-next";
import NewNoteIcon from "@/public/new_note.svg";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import {
  addNewDir,
  addNewNote,
  deleteDirFromDB,
  deleteNoteFromDB,
} from "@/server";
import cn from "classnames";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { ItemTab } from "@/components/ItemTab/ItemTab";
import { UserProfile } from "@/components";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const NotesContext = createContext<{
  dirs: Directory[];
  activeDir: number;
  activeNote: number;
  isLoading: boolean;
  setDirs: Dispatch<SetStateAction<Directory[]>>;
}>({
  dirs: [],
  activeDir: 0,
  activeNote: 0,
  isLoading: true,
  setDirs: () => {},
});

export default function NotesLayout({ children }: { children: any }) {
  const session = useSession();
  const [dirs, setDirs] = useState<Directory[]>([]);
  const [activeDir, setActiveDir] = useState<number>(0);
  const [activeNote, setActiveNote] = useState<number>(0);
  const { error, isLoading } = useSWR<Directory[]>("/api/dirs", fetcher, {
    onSuccess(data) {
      setDirs(data);
    },
  });

  useEffect(() => {
    const dir = getCookie("active_dir");

    const note = getCookie("active_note");

    if (dir !== undefined && dir !== null) {
      setActiveDir(parseInt(dir.toString()));
    }

    if (note !== undefined && note !== null) {
      setActiveNote(parseInt(note.toString()));
    }
  }, []);

  useEffect(() => {
    setCookie("active_dir", activeDir);
  }, [activeDir]);

  useEffect(() => {
    setCookie("active_note", activeNote);
  }, [activeNote]);

  if (error) {
    return (
      <>
        <div>{error.message}</div>
        <AuthProvider>{children}</AuthProvider>
      </>
    );
  }

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

    if (dirId === activeDir) {
      setActiveDir(0);
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

    if (noteId === activeNote) {
      setActiveNote(0);
    }

    await deleteNoteFromDB(dirId, noteId);
  };

  return (
    <div className="flex">
      <div className="min-w-[414px] border-r-[1px] border-[#D4D4D4] border-solid h-screen m-0">
        <Link className="inline-block mt-[36px] ml-[42px]" href="/">
          <PlanetIcon />
        </Link>
        {isLoading ? (
          <div className="load"></div>
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
                <ItemTab
                  key={index}
                  onClick={() => {
                    setActiveDir(index);
                    setActiveNote(0);
                  }}
                  className={cn({
                    ["bg-[#F8F8F8]"]: index === activeDir,
                  })}
                  title={dir.name}
                  onDelete={() => deleteDir(index)}
                />
              ))}
              <div className="flex justify-between text-[18px] font-medium small-caps opacity-[0.5] text-[#242424] mt-[48px]">
                <h4>Notes</h4>
              </div>
              <div className="flex flex-col gap-5px mt-[16px]">
                {dirs[activeDir]?.notes.map((note, index) => (
                  <ItemTab
                    key={index}
                    onClick={() => setActiveNote(index)}
                    className={cn({
                      ["bg-[#F8F8F8]"]: index === activeNote,
                    })}
                    title={note.title}
                    onDelete={() => deleteNote(activeDir, index)}
                  />
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
            {session.status === "authenticated" && (
              <UserProfile
                name={session.data.user?.name}
                username={session.data.user?.username}
                image={session.data.user?.image}
                onClick={() => signOut()}
              />
            )}
          </>
        )}
      </div>
      <NotesContext.Provider
        value={{
          dirs: dirs,
          activeDir: activeDir,
          activeNote: activeNote,
          isLoading: isLoading,
          setDirs: setDirs,
        }}
      >
        <AuthProvider>{children}</AuthProvider>
      </NotesContext.Provider>
    </div>
  );
}
