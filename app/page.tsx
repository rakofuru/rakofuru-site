import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PortalPageContent } from "@/components/portal-page-content"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <PortalPageContent />
      </main>
      <Footer />
    </div>
  )
}
