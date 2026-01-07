
import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, MapPin, Phone, Globe, Map, Star } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { getFarmViewBySlug, getAreaName, farmsView } from "@/lib/view-data"
import { FarmInfoTable } from "@/components/farm-info-table"
import { FarmSection } from "@/components/farm-section"
import { ReviewWidget } from "@/components/review-widget"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return farmsView.map((farm) => ({
    slug: farm.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const farm = getFarmViewBySlug(slug)

  if (!farm) {
    return {
      title: "農園が見つかりません - らこふる",
    }
  }

  const canonicalUrl = `https://rakofuru.com/farms/${farm.slug}`
  const ogImageUrl = farm.heroImage?.srcUrl || "/icon.png"

  return {
    title: `${farm.title} - らこふる`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${farm.title} - らこふる`,
      url: canonicalUrl,
      images: [ogImageUrl],
    },
  }
}

export default async function FarmDetailPage({ params }: PageProps) {
  const { slug } = await params
  const farm = getFarmViewBySlug(slug)

  if (!farm) {
    notFound()
  }

  const areaName = getAreaName(farm.categorySlug);
  const heroImageUrl = farm.heroImage?.srcUrl || "/placeholder.svg"

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="flex-1">
        {/* Back Navigation */}
        <div className="border-b border-border bg-white sticky top-0 z-20 shadow-sm opacity-95 backdrop-blur">
          <div className="container mx-auto px-4 py-3">
            <Link href="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
              <ChevronLeft className="h-4 w-4" />
              農園一覧に戻る
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-[16/9] max-h-[50vh] w-full overflow-hidden bg-muted md:aspect-[21/9]">
          <img src={heroImageUrl} alt={farm.title} className="h-full w-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-4 container mx-auto px-4 text-white">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/90 px-3 py-1 text-xs font-bold">
              <MapPin className="h-3 w-3" />
              {areaName}
            </div>
            <h1 className="text-2xl font-bold md:text-4xl text-shadow-md">{farm.title}</h1>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">

              {/* Important Info Table */}
              {farm.infoTable && Object.keys(farm.infoTable).length > 0 && (
                <FarmInfoTable infoTable={farm.infoTable} />
              )}

              {/* Sections (Access, Parking, etc) */}
              <div className="space-y-8">
                {farm.sections.map((section, idx) => (
                  <FarmSection key={idx} title={section.title} contentHtml={section.contentHtml} />
                ))}
              </div>

              {/* Review Widget */}
              {farm.reviewWidgetId && (
                <ReviewWidget id={farm.reviewWidgetId} />
              )}

            </div>

            {/* Sidebar - Quick Actions & Map */}
            <aside className="lg:col-span-1 space-y-6">
              <div className="sticky top-20 space-y-6">
                {/* Action Card */}
                <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
                  <h3 className="mb-4 font-bold text-gray-900">クイックアクション</h3>
                  <div className="space-y-3">
                    {/* Phone */}
                    {(farm.infoTable as any)?.["電話番号"] && (
                      <Button className="w-full justify-start gap-2" size="lg" asChild>
                        {/* Extract number or just link */}
                        <a href={(farm.infoTable as any)["電話番号"].match(/href="([^"]*)"/)?.[1] || "#"}>
                          <Phone className="h-4 w-4" />
                          電話で問い合わせ
                        </a>
                      </Button>
                    )}
                    {/* Official Site */}
                    {farm.location.officialUrl && (
                      <Button variant="outline" className="w-full justify-start gap-2" size="lg" asChild>
                        <a href={farm.location.officialUrl} target="_blank" rel="noopener noreferrer">
                          <Globe className="h-4 w-4" />
                          公式サイトを見る
                        </a>
                      </Button>
                    )}
                    {/* Map */}
                    {farm.location.googleMapsPlaceUrl && (
                      <Button variant="secondary" className="w-full justify-start gap-2" size="lg" asChild>
                        <a href={farm.location.googleMapsPlaceUrl} target="_blank" rel="noopener noreferrer">
                          <Map className="h-4 w-4" />
                          Googleマップ
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
