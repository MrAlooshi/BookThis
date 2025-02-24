import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BookThis - Easy Scheduling System",
  description: "Book your appointments with ease",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen bg-background")}>
        <AuthProvider>
          <header className="bg-white border-b">
            <nav className="container mx-auto px-4 py-4">
              <div className="flex justify-between items-center">
                <Link href="/" className="flex items-center space-x-2">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BookThis_Icon-fSgnPF9qSNli6xfecQq0tk8DPIZVdn.png"
                    alt="BookThis Logo"
                    width={60}
                    height={70}
                  />
                  <span className="text-xl font-bold text-primary">BookThis</span>
                </Link>
                <ul className="flex space-x-6">
                  <li>
                    <Link href="/" className="text-gray-600 hover:text-primary">
                      Forside
                    </Link>
                  </li>
                  <li>
                    <Link href="/features" className="text-gray-600 hover:text-primary">
                      Funktioner
                    </Link>
                  </li>
                  <li>
                    <Link href="/services" className="text-gray-600 hover:text-primary">
                      Ydelser
                    </Link>
                  </li>
                  <li>
                    <Link href="/book" className="text-gray-600 hover:text-primary">
                      Book Nu
                    </Link>
                  </li>
                  <li>
                    <Link href="/login" className="text-gray-600 hover:text-primary">
                      Login
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </header>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}



import './globals.css'