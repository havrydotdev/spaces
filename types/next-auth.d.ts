import NextAuth, { DefaultSession } from "next-auth";

interface IUser extends DefaultUser {
  id?: string | null | undefined;
  username?: string | null | undefined;
  name?: string | null | undefined;
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
