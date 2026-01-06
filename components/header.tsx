import Link from "next/link"
import Image from "next/image"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/icon.png" alt="らこふる" width={28} height={28} className="rounded" />
          <span className="text-lg font-bold text-foreground">らこふる</span>
        </Link>
        <nav className="flex items-center gap-4 md:gap-6">
          <Link href="/" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
            ホーム
          </Link>
          <Link
            href="/about-me"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
          >
            サイトについて
          </Link>
        </nav>
      </div>
    </header>
  )
}
