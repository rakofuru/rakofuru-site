import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2 font-bold text-xl text-primary/80">
            らこふる
          </div>
          <p className="max-w-md text-sm text-muted-foreground">千葉県のブルーベリー観光農園を探すなら「らこふる」</p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">
              ホーム
            </Link>
            <Link href="/about-me" className="hover:text-primary">
              サイトについて
            </Link>
            <Link href="/privacy-policy" className="hover:text-primary">
              プライバシーポリシー
            </Link>
          </div>
        </div>
        <div className="mt-6 border-t border-border pt-4 text-center text-xs text-muted-foreground">
          © 2026 らこふる
        </div>
      </div>
    </footer>
  )
}
