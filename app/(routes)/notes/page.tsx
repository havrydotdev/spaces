"use client";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";

const NotesPage = ({
  active,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {};

export const getServerSideProps: GetServerSideProps<{
  active: string | undefined;
}> = async (ctx: GetServerSidePropsContext) => {
  const active = ctx.req.cookies["active_dir"];

  return {
    props: {
      active,
    },
  };
};

export default NotesPage;
