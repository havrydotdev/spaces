"use client";
import { prompt } from "@/app/fonts";
import { AuthInput, CustomButton } from "@/components";
import { registerUser } from "@/server";
import { GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";

export default function RegisterPage(): React.JSX.Element {
  const { push } = useRouter();

  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      void push("/notes");
    }
  }, [status]);

  const [form, setForm] = useState({
    username: "",
    password: "",
    name: "",
    confirm: "",
    email: "",
  });

  const [error, setError] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (form.password != form.confirm) {
        setError("Passwords are not the same");
        return;
      }

      const res = await registerUser({
        username: form.username,
        name: form.name,
        password: form.password,
        email: form.email,
      });

      setForm({ username: "", password: "", name: "", confirm: "", email: "" });
      if (res.ok) {
        push("/auth/login");
      }
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  };

  return (
    <main className="w-screen flex justify-center">
      <div className="sm:min-w-[480px] sm:max-w-[600px]">
        <h1
          className={`mt-[90px] ${prompt.className} font-medium text-[50px] ${
            error && "mt-[30px]"
          }`}
        >
          Sign-up
        </h1>
        <form onSubmit={onSubmit} className="mt-[70px]">
          <div className="flex flex-col gap-[15px] mb-[10px]">
            <AuthInput
              placeholder="Email"
              name="email"
              type="text"
              onChange={handleChange}
              className="focus:outline-none"
              value={form.email}
            />
            <AuthInput
              placeholder="Username"
              name="username"
              type="text"
              onChange={handleChange}
              className="focus:outline-none"
              value={form.username}
            />
            <AuthInput
              placeholder="Full name"
              name="name"
              type="text"
              onChange={handleChange}
              className="focus:outline-none"
              value={form.name}
            />
            <AuthInput
              placeholder="Password"
              type="password"
              onChange={handleChange}
              className="focus:outline-none"
              value={form.password}
            />
            <AuthInput
              placeholder="Confirm password"
              type="password"
              name="confirm"
              className="focus:outline-none"
              onChange={handleChange}
              value={form.confirm}
            />
          </div>
          <Link
            className="small-caps text-[23px] text-[#242424] opacity-[0.5]"
            href="/auth/login"
          >
            Already have an account?
          </Link>
          <div className="flex mt-[55px] sm:gap-[23px] justify-center max-sm:flex-col max-sm:items-center max-sm:gap-[15px] max-sm:mt-[80px] mb-[70px]">
            <CustomButton text="Sign up" type="submit" color="primary" />
          </div>
        </form>
      </div>
    </main>
  );
}
