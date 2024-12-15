import type { Metadata } from "next";
import "./globals.css";
import  { Inter } from 'next/font/google' 
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { ClerkProvider } from '@clerk/nextjs'
const inter = Inter({ subsets : ["latin"] })
import { dark } from '@clerk/themes'

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
    <ClerkProvider
      appearance={{
        baseTheme : dark
      }}
    >
      <html lang="en">
        <body className={`${inter.className} dotted-background`}>
          <ThemeProvider attribute={'class'} defaultTheme="dark">
            <Header />
            <main className="min-h-screen">{children}</main>
            <footer className= "border-t-2 py-12"> {/* Color */}
              <div className="container mx-auto text-center px-4 gradient-title">
                Made with ❤️ By Raunak
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
