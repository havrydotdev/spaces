"use client";
import { setCookie } from "cookies-next";

const DirsPage = ({ params }: { params: { id: number } }) => {
  setCookie("active_dir", params.id);
  return <div>Hello world!</div>;
};

export default DirsPage;
