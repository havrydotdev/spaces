"use client";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import { prompt } from "@/app/fonts";
import { AuthButton } from "@/components/AuthButton/AuthButton";
import GoogleIcon from "@/public/google.svg";
import FacebookIcon from "@/public/facebook.svg";
import { AuthInput } from "@/components/AuthInput/AuthInput";
import { CustomButton } from "@/components";
import { ChangeEvent, useEffect, useState } from "react";
import { redirect, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { getServerSession } from "next-auth";
import { options } from "@/app/api";
export default function SignIn({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/notes";

  const { push } = useRouter();

  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      push("/notes");
    }
  }, []);

  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const res = await signIn("credentials", {
        redirect: false,
        username: formValues.username,
        password: formValues.password,
        callbackUrl,
      });

      setFormValues({ username: "", password: "" });
      if (res?.ok) {
        push(callbackUrl);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <main className="w-screen flex justify-center">
      <div className="mx-[30px] sm:min-w-[480px]">
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
        <form onSubmit={onSubmit}>
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <AuthInput placeholder="Username" onChange={handleChange} />
          <AuthInput
            placeholder="Password"
            type="password"
            className="mt-[21px]"
            onChange={handleChange}
          />
          <div className="flex mt-[61px] sm:gap-[23px] justify-center max-sm:flex-col max-sm:items-center max-sm:gap-[15px] max-sm:mt-[80px]">
            <CustomButton text="Login" color="primary" type="submit" />
            <CustomButton text="Sign up" href="/auth/register" type="button" />
          </div>
        </form>
      </div>
    </main>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const csrfToken = await getCsrfToken(context);

  return {
    props: {
      csrfToken,
    },
  };
}
