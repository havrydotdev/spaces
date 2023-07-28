import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUser } from "@/app/data/auth/user";

export const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/login",
  },
  session: {
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async session({ session, token }) {
      session.user!.email = token.email;
      session.user!.id = token.id;
      session.user!.image = token.image;
      session.user!.username = token.username;
      session.user!.name = token.name;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.id = user.id;
        token.image = user.image;
        token.username = user.username;
        token.name = user.name;
      }
      return token;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID ?? "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Spaces Account",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        return await getUser(credentials?.username, credentials?.password);
      },
    }),
  ],
  logger: {
    error(code, metadata) {
      console.log(code, metadata);
    },
    warn(code) {
      console.log(code);
    },
    debug(code, metadata) {
      console.log(code, metadata);
    },
  },
};