"use client";
import { setCookie } from "cookies-next";

const DirsPage = ({ params }: { params: { id: number; noteId: number } }) => {
  setCookie("active_note", params.noteId);
  return <div>Hello world!</div>;
};

export default DirsPage;
