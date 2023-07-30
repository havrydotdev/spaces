import NextAuth, { DefaultSession } from "next-auth";

interface IUser {
  id: string;
  email: string;
  username: string;
  image?: string | null | undefined;
}

declare module "next-auth" {
  interface User extends IUser {}
  interface Session {
    user?: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends IUser {}
}
