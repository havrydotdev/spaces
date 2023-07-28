import { Prompt } from "next/font/google";
import localFont from "next/font/local";

export const sf_pro = localFont({
  src: [
    {
      path: "../fonts/bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/semibold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/regular.woff",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-sf",
});

export const prompt = Prompt({
  weight: "500",
  style: "normal",
  subsets: ["latin"],
});
