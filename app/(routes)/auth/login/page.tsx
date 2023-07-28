"use client";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getCsrfToken, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { options } from "../../../api";
import { prompt } from "@/app/fonts";
import { AuthButton } from "@/components/AuthButton/AuthButton";
import GoogleIcon from "@/public/google.svg";
import FacebookIcon from "@/public/facebook.svg";
import { AuthInput } from "@/components/AuthInput/AuthInput";

export default function SignIn({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main className="w-screen flex justify-center">
      <div className="mx-[50px] sm:min-w-[480px]">
        <h1 className={`mt-[78px] ${prompt.className} font-medium text-[50px]`}>
          Sign-in
        </h1>
        <div className="flex justify-center gap-5 mt-[61px] max-sm:justify-start max-sm:gap-2">
          <AuthButton
            text="Google"
            onClick={() => signIn("google")}
            icon={<GoogleIcon />}
          />
          <AuthButton
            onClick={() => signIn("facebook")}
            text="Facebook"
            icon={<FacebookIcon />}
          />
        </div>
        <div className="opacity-[0.20000000298023224] bg-[#242424] h-[1px] my-[42px]"></div>
        <form method="post" action="/api/auth/callback/credentials">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <AuthInput placeholder="Username" />
          <AuthInput
            placeholder="Password"
            type="password"
            className="mt-[21px]"
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </main>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, options);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/notes" } };
  }

  const csrfToken = await getCsrfToken(context);

  return {
    props: {
      csrfToken,
    },
  };
}
