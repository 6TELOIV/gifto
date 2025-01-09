import type { Metadata } from "next";
import "./globals.css";
import { sessionUser } from "@/src/auth/sessionUser";

export const metadata: Metadata = {
  title: "Gifto",
  description: "It's like bingo, with gifts!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme } = (await sessionUser()) ?? { theme: "system" };

  return (
    <html lang="en" className={theme}>
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>{children}</body>
    </html>
  );
}
