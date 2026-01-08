import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft, Globe, Map, MapPin, Phone, Star } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { FarmSection } from "@/components/farm-section"
import { ReviewWidget } from "@/components/review-widget"
import { UnifiedInfoBlock } from "@/components/unified-info-block"
import { CommentSection } from "@/components/comment-section"
import { getFarmViewBySlug, getFarmViewList } from "@/lib/farms"
import { getAreaName } from "@/lib/view-data"
import { getSiteUrl } from "@/lib/site"
import { getCommentsForFarm } from "@/lib/comments"
import type { Metadata } from "next"

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const farms = await getFarmViewList()
  return farms.map((farm) => ({
    slug: farm.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const farm = await getFarmViewBySlug(params.slug)

  if (!farm) {
    return {
      title: "農園が見つかりません - らこふる",
    }
  }

  const baseUrl = getSiteUrl()
  const canonicalUrl = `${baseUrl}/farms/${farm.slug}`
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

function extractTel(infoTable: Record<string, string> | undefined) {
  if (!infoTable) return null
  const html = infoTable["電話番号"]
  if (!html) return null
  const match = html.match(/href="([^"]+)"/)
  return match?.[1] ?? null
}

function getMapLink(farm: Awaited<ReturnType<typeof getFarmViewBySlug>>) {
  if (!farm) return "#"
  const placeUrl = farm.location.googleMapsPlaceUrl
  if (placeUrl && !placeUrl.includes("/maps/embed")) {
    return placeUrl
  }
  const address = farm.location.addressText || farm.title
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
}

export default async function FarmDetailPage({ params }: PageProps) {
  const farm = await getFarmViewBySlug(params.slug)

  if (!farm) {
    notFound()
  }

  const areaName = getAreaName(farm.categorySlug)
  const heroImageUrl = farm.heroImage?.srcUrl || "/placeholder.svg"

  const accessSection = farm.sections.find((section) => section.title.includes("アクセス"))
  const otherSections = farm.sections.filter((section) => !section.title.includes("アクセス"))
  const comments = await getCommentsForFarm(farm.slug)

  const phoneHref = farm.location.phone ? `tel:${farm.location.phone}` : extractTel(farm.infoTable) || ""

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="flex-1">
        <div className="sticky top-0 z-20 border-b border-border bg-white/95 shadow-sm backdrop-blur">
          <div className="container mx-auto px-4 py-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              <ChevronLeft className="h-4 w-4" />
              農園一覧に戻る
            </Link>
          </div>
        </div>

        <div className="relative aspect-[16/9] max-h-[50vh] w-full overflow-hidden bg-muted md:aspect-[21/9]">
          <img src={heroImageUrl} alt={farm.title} className="h-full w-full object-cover" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-6 left-4 container mx-auto px-4 text-white">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-primary/90 px-3 py-1 text-xs font-bold shadow-lg">
              <MapPin className="h-3 w-3" />
              {areaName}
            </div>
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-shadow-lg md:text-5xl">{farm.title}</h1>
            <p className="max-w-2xl text-sm font-medium text-shadow-sm opacity-90 md:text-base">
              千葉でブルーベリー狩りを楽しむならここ。家族で楽しめる自然豊かな農園です。
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-10 lg:col-span-2">
              <UnifiedInfoBlock farm={farm} />

              {farm.reviewWidgetId && (
                <div className="border-t border-dashed border-slate-300 pt-8">
                  <h2 className="mb-6 flex items-center gap-2 text-xl font-bold text-gray-900">
                    <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                    この農園の口コミ (Google Maps)
                  </h2>
                  <ReviewWidget id={farm.reviewWidgetId} />
                </div>
              )}

              {accessSection && (
                <div className="border-t border-dashed border-slate-300 pt-8" id="access">
                  <FarmSection title={accessSection.title} contentHtml={accessSection.contentHtml} />
                </div>
              )}

              <div className="border-t border-dashed border-slate-300 pt-8">
                <CommentSection farmSlug={farm.slug} initialComments={comments} />
              </div>

              {otherSections.length > 0 && (
                <div className="border-t border-dashed border-slate-300 pt-8 space-y-12">
                  {otherSections.map((section, index) => (
                    <FarmSection key={`${section.title}-${index}`} title={section.title} contentHtml={section.contentHtml} />
                  ))}
                </div>
              )}
            </div>

            <aside className="space-y-6 lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
                  <h3 className="mb-4 font-bold text-gray-900">クイックアクション</h3>
                  <div className="space-y-3">
                    {phoneHref && (
                      <Button className="w-full justify-start gap-2" size="lg" asChild>
                        <a href={phoneHref}>
                          <Phone className="h-4 w-4" />
                          電話で問い合わせ
                        </a>
                      </Button>
                    )}
                    {farm.location.officialUrl && (
                      <Button variant="outline" className="w-full justify-start gap-2" size="lg" asChild>
                        <a href={farm.location.officialUrl} target="_blank" rel="noopener noreferrer">
                          <Globe className="h-4 w-4" />
                          公式サイトを見る
                        </a>
                      </Button>
                    )}
                    <Button variant="secondary" className="w-full justify-start gap-2" size="lg" asChild>
                      <a href={getMapLink(farm)} target="_blank" rel="noopener noreferrer">
                        <Map className="h-4 w-4" />
                        Googleマップで開く
                      </a>
                    </Button>
                    <div className="mt-4 border-t border-slate-100 pt-4 text-center">
                      <Link href="/partners/join" className="text-xs text-muted-foreground underline transition-colors hover:text-primary">
                        農園掲載のお申し込みはこちら
                      </Link>
                    </div>
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
