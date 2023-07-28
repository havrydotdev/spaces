"use client";
import { setCookie } from "cookies-next";
import { getSession, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function NotesPage({
  pageVisited,
}: {
  pageVisited: boolean | null;
}): React.JSX.Element {
  const { data: session } = useSession();
  useEffect(() => {
    if (!pageVisited) {
      setCookie("pageVisited", true);
    }
  }, []);

  return <div>Content</div>;
}

export const getServerSideProps = async (ctx: any) => {
  const { pageVisited } = ctx.req.cookies;

  return { props: { pageVisited: pageVisited ?? null } };
};
