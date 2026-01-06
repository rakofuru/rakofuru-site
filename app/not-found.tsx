import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 items-center justify-center px-4 py-24">
        <div className="text-center">
          <div className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full bg-muted">
            <svg viewBox="0 0 24 24" className="h-12 w-12 text-muted-foreground" fill="currentColor">
              <circle cx="12" cy="10" r="6" />
              <path d="M12 4 C10 2, 14 2, 12 4" />
            </svg>
          </div>
          <h1 className="mb-4 text-4xl font-bold text-foreground">404</h1>
          <p className="mb-8 text-lg text-muted-foreground">お探しのページが見つかりませんでした</p>
          <Button asChild>
            <Link href="/">ホームに戻る</Link>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  )
}
