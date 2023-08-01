"use client";
import { useContext } from "react";
import { NotesContext } from "./layout";

const NotesPage = () => {
  const context = useContext(NotesContext);
  return (
    <div>
      <p>Active dir: {context.activeDir}</p>
      <p>Active note: {context.activeNote}</p>
    </div>
  );
};

export default NotesPage;
