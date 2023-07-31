"use client";
import type { Metadata } from "next";
import { sf_pro } from "@/app/fonts";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import { Directory } from "@/types/data";
import useSWR from "swr";
import cn from "classnames";
import PlanetIcon from "@/public/planet.svg";
import PlusIcon from "@/public/plus.svg";
import { getCookie } from "cookies-next";
import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: "Notes page",
  description: "Fast and easy-to-use note taking website",
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function NotesLayout({ children }: { children: any }) {
  const { data, error, isLoading } = useSWR<Directory[]>("/api/dirs", fetcher);
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

  return (
    <html lang="en">
      <body className={sf_pro.className}>
        <div className="flex">
          <div className="min-w-[414px] border-r-[1px] border-[#D4D4D4] border-solid h-screen m-0">
            <PlanetIcon className="mt-[36px] ml-[42px]" />
            {isLoading ? (
              <div className={styles.load}></div>
            ) : (
              <>
                <div className="flex mt-[46px] w-[325px] ml-[42px] text-[18px] font-medium opacity-[0.5] text-[#242424] small-caps justify-between">
                  <h4>Lists</h4>
                  <div className="flex flex-col justify-center">
                    <PlusIcon className="cursor-pointer" />
                  </div>
                </div>
                <div className="flex flex-col gap-5px mt-[16px] ml-[42px]">
                  {data!.map((dir, index) => (
                    <a
                      className={`flex items-center text-[18px] h-[41px] w-[325px] rounded-lg text-[#242424] ${
                        index === activeDir ? "bg-[#F8F8F8]" : ""
                      }`}
                      key={index}
                      href={`/notes/${index}`}
                    >
                      <p className="ml-[10px]">{dir.name}</p>
                    </a>
                  ))}
                  <div className="flex justify-between text-[18px] font-medium small-caps opacity-[0.5] text-[#242424] mt-[48px]">
                    <h4>Notes</h4>
                  </div>
                  <div className="flex flex-col gap-5px mt-[16px]">
                    {data![activeDir].notes.map((note, index) => (
                      <a
                        className={`flex items-center text-[18px] h-[41px] w-[325px] rounded-lg text-[#242424] ${
                          index === activeNote ? "bg-[#F8F8F8]" : ""
                        }`}
                        key={index}
                        href={`/notes/${activeDir}/${activeNote}`}
                      >
                        <p className="ml-[10px]">{note.title}</p>
                      </a>
                    ))}
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
