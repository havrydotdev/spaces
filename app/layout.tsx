import "./globals.css";
import type { Metadata } from "next";
import { sf_pro } from "./fonts";
import AuthProvider from "@/components/AuthProvider/AuthProvider";

export const metadata: Metadata = {
  title: "Hello Spaces!",
  description: "Fast and easy-to-use note taking website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={sf_pro.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
