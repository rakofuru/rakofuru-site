import type React from "react"
import type { Metadata } from "next"
import { Noto_Sans_JP } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-jp",
})

export const metadata: Metadata = {
  title: "らこふる - 千葉のブルーベリー農園さがし",
  description:
    "千葉のブルーベリー観光農園を探すなら「らこふる」。営業時期や料金、設備を比較しながら自分に合う農園を見つけられます。",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.className} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
