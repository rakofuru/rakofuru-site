import Link from "next/link"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center transition-opacity hover:opacity-80">
          <img src="/icon.png" alt="らこふる" className="h-10 w-auto object-contain md:h-12" />
        </Link>
        <nav className="flex items-center gap-4 md:gap-6">
          <Link href="/" className="text-sm font-bold text-gray-600 transition-colors hover:text-primary">
            ホーム
          </Link>
          <Link href="/about-me" className="text-sm font-bold text-gray-600 transition-colors hover:text-primary">
            サイトについて
          </Link>
          <Link href="/contact" className="text-sm font-bold text-gray-600 transition-colors hover:text-primary">
            お問い合わせ
          </Link>
        </nav>
      </div>
    </header>
  )
}
