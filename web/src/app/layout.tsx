import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "../context/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chess Thing",
  description: "A simple chess game application",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextTopLoader
            color="#f59e0b"
            height={4}
            crawlSpeed={200}
            easing="ease"
            crawl={true}
            speed={200}
            showSpinner={false}
          />
          <Toaster />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
