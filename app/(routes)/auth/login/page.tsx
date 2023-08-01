"use client";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getCsrfToken, signIn } from "next-auth/react";
import { prompt } from "@/app/fonts";
import { AuthButton } from "@/components/AuthButton/AuthButton";
import GoogleIcon from "@/public/google.svg";
import FacebookIcon from "@/public/facebook.svg";
import { AuthInput } from "@/components/AuthInput/AuthInput";
import { CustomButton } from "@/components";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getUserFriendyErrorText } from "@/utils";

export default function SignIn({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { push } = useRouter();
  // get all search params from current url
  const searchParams = useSearchParams();

  // get callback url from search params
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  // get error search param (redirected by auth handler if something goes wrong)
  let errorFromServer = searchParams.get("error");

  // form values (updated by inputs)
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  /**
   * Gets event.target `name` param and sets form.{name} state to event.target `value`
   * @param {ChangeEvent<HTMLInputElement>} event - event passed by onChange listener
   */
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  /**
   * Checks if form.password == form.confirm and makes post request to sign in handler
   * @param {React.FormEvent} e - event type passed by react`s onSubmit listener
   */
  const onSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      const formToSend = formValues;

      // set form values before sending request
      setFormValues({ password: "", email: "" });

      const res = await signIn("credentials", {
        redirect: false,
        email: formToSend.email,
        password: formToSend.password,
        callbackUrl,
      });

      if (!res?.ok) {
        console.log(res?.error);
      } else {
        push("/notes/0");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <main className="w-screen flex justify-center">
      <div className="mx-[30px] sm:min-w-[480px]">
        {errorFromServer && <p>{getUserFriendyErrorText(errorFromServer)}</p>}
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
          <input type="hidden" value={csrfToken} />
          <AuthInput
            placeholder="Email"
            onChange={handleChange}
            value={formValues.email}
          />
          <AuthInput
            placeholder="Password"
            type="password"
            className="mt-[21px]"
            onChange={handleChange}
            value={formValues.password}
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

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const csrfToken = await getCsrfToken(ctx);

  return {
    props: {
      csrfToken,
    },
  };
};
