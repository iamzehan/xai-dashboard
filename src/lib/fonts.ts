import { Sora, Inter } from "next/font/google";

// Headings
export const sora = Sora({
    subsets: ["latin"],
    variable: "--font-sora",
});

// Body
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});