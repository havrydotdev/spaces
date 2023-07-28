import "./globals.css";
import type { Metadata } from "next";
import { sf_pro } from "./fonts";

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
      <body className={sf_pro.className}>{children}</body>
    </html>
  );
}
