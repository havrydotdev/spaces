import NextAuth, { DefaultSession } from "next-auth";

interface IUser extends DefaultUser {
  id: string;
  username: string;
  name: string;
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
