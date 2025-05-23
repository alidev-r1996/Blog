import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import NavBar from "@/components/navigation/navbar";
import SideBar from "@/components/sidebar/sidebar";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "./api/uploadthing/core";
import { Toaster } from "react-hot-toast";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blog App",
  description: "full-stack social blog app powered Bye Alidev.r1996@gmail.com",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
      <html lang="en" suppressHydrationWarning>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen">
              <NavBar />
              <main className="py-8 ">
                <div className="max-w-7xl mx-auto px-4">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className={`hidden lg:block lg:col-span-3`}>
                      <SideBar />
                    </div>
                    <NextSSRPlugin
                      /**
                       * The `extractRouterConfig` will extract **only** the route configs
                       * from the router to prevent additional information from being
                       * leaked to the client. The data passed to the client is the same
                       * as if you were to fetch `/api/uploadthing` directly.
                       */
                      routerConfig={extractRouterConfig(ourFileRouter)}
                    />
                    <div className="lg:col-span-9">{children}</div>
                  </div>
                </div>
              </main>
            </div>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
  );
}
