import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import { Providers } from "@/app/providers"
import { MobileAlert } from "@/components/mobile-alert"
import "./globals.css"

const inter = localFont({
  src: [
    {
      path: "../public/fonts/Inter-Variable.woff2",
    },
  ],
  variable: "--font-sans",
})

const firaCode = localFont({
  src: [
    {
      path: "../public/fonts/FiraCode-Regular.woff2",
    },
  ],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Neel Khatri | Full Stack Developer",
  description: "2nd Year CS Student building scalable solutions with C++, MERN, and Next.js",
  icons: {
    icon: [
      {
        url: "/icon.jpeg",
        type: "image/jpeg",
      },
    ],
    apple: "/icon.jpeg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${firaCode.variable} font-sans antialiased transition-colors duration-300`}>
        <Providers>
          {children}
          <MobileAlert />
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
