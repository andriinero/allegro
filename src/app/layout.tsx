import "@/styles/globals.css";
import { TRPCReactProvider } from "@/trpc/react";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Allegro",
  description: "Learn how to play guitar in no time!",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable} antialiased`}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Toaster position="top-center" richColors />
        <Analytics />
      </body>
    </html>
  );
}
