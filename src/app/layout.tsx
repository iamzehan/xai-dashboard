import type { Metadata } from "next";
import {sora, inter} from "../lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "XAI Intelligence",
  description: "Managing your data has never been easier!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
