"use client";
import { useContext } from "react";
import { NotesContext } from "./layout";

const NotesPage = () => {
  const context = useContext(NotesContext);
  return (
    <>
      {context.isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="ml-[44px]">
          <div className="flex text-[18px] small-caps font-medium mt-[54px]">
            <h2 className="opacity-[0.20000000298023224]">
              {context.dirs[context.activeDir]?.name}&nbsp;/&nbsp;
            </h2>
            <h2 className="opacity-[0.5]">
              {context.dirs[context.activeDir]?.notes[context.activeNote].title}
            </h2>
          </div>
        </div>
      )}
    </>
  );
};

export default NotesPage;
