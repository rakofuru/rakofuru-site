import { Suspense } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SearchResults } from "@/components/search-results"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Suspense fallback={null}>
          <SearchResults />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
