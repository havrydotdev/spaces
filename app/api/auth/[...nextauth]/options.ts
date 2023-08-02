import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUser, getUserByEmail } from "@/app/data/users";

export const options: NextAuthOptions = {
  secret: process.env.JWT_SECRET,
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
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.id = user.id;
        token.image = user.image;
        token.username = user.username;
      }
      return token;
    },
    async signIn({ user, account, profile }) {
      if (account?.provider == "google" || account?.provider == "facebook") {
        const u = await getUserByEmail(profile?.email);
        if (!u) {
          return "/auth/login/?error=user_is_not_registered";
        }

        user.id = u.id;
        user.username = u.username;
        if (!user.image || user.image == "") {
          user.image = u.image;
        }
      }

      return true;
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
        email: {
          label: "Emial",
          type: "text",
          placeholder: "email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      async authorize(credentials) {
        return await getUser(credentials?.email, credentials?.password);
      },
    }),
  ],
};
