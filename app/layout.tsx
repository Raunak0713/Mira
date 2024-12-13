import type { Metadata } from "next";
import "./globals.css";
import  { Inter } from 'next/font/google' 
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { ClerkProvider } from '@clerk/nextjs'
const inter = Inter({ subsets : ["latin"] })

export const metadata: Metadata = {
  title: "Mira ✨",
  description: "Project Management App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className}`}>
          <ThemeProvider attribute={'class'} defaultTheme="dark">
            <Header />
            <main className="min-h-screen">{children}</main>
            <footer className="bg-gray-900 py-12"> {/* Color */}
              <div className="container mx-auto text-center px-4">
                Made with ❤️ By Raunak
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
