import {
  Fira_Code as FontMono,
  Inter as FontSans,
  Geist,
  Geist_Mono,
} from "next/font/google";

export const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});
