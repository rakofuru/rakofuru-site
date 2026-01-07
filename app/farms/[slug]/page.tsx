import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft, MapPin, Phone, Globe, Map, Star } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { areas, farms, getFarmBySlug } from "@/lib/data"

interface PageProps {
  params: Promise<{ slug: string }>
}

type FarmComment = {
  id: string
  author: string
  date: string
  content: string
  replies?: FarmComment[]
}

export async function generateStaticParams() {
  return farms.map((farm) => ({
    slug: farm.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const farm = getFarmBySlug(slug)

  if (!farm) {
    return {
      title: "農園が見つかりません - らこふる",
    }
  }

  const canonicalUrl = farm.legacy.wpPermalink ?? `https://rakofuru.com/farms/${farm.slug}`
  const ogImageUrl = farm.heroImage?.srcUrl ?? farm.images[0]?.srcUrl ?? "/icon.png"

  return {
    title: `${farm.title} - らこふる`,
    description: farm.excerpt ?? undefined,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${farm.title} - らこふる`,
      description: farm.excerpt ?? undefined,
      url: canonicalUrl,
      images: [ogImageUrl],
    },
  }
}

export default async function FarmDetailPage({ params }: PageProps) {
  const { slug } = await params
  const farm = getFarmBySlug(slug)

  if (!farm) {
    notFound()
  }

  const areaName = areas.find((area) => area.slug === farm.categorySlug)?.name || farm.categorySlug
  const farmComments: FarmComment[] = []
  const heroImageUrl = farm.heroImage?.srcUrl ?? farm.images[0]?.srcUrl ?? "/placeholder.svg"

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Back Navigation */}
        <div className="border-b border-border bg-muted/30">
          <div className="container mx-auto px-4 py-3">
            <Link href="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
              <ChevronLeft className="h-4 w-4" />
              農園一覧に戻る
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative aspect-[16/9] max-h-80 w-full overflow-hidden bg-muted md:aspect-[21/9]">
          <img src={heroImageUrl} alt={farm.title} className="h-full w-full object-cover" />
        </div>

        <div className="container mx-auto px-4 py-6 md:py-8">
          {/* Title Section */}
          <header className="mb-6 border-b border-border pb-6">
            <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{areaName}</span>
            </div>
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">{farm.title}</h1>
            <p className="mt-2 text-muted-foreground">{farm.excerpt ?? ""}</p>
          </header>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Gallery */}
              {farm.images.length > 0 && (
                <section className="mb-8">
                  <h2 className="mb-4 text-lg font-bold text-foreground">写真</h2>
                  <div className="grid grid-cols-3 gap-2">
                    {farm.images.map((image) => (
                      <div key={image.id} className="aspect-square overflow-hidden rounded-lg bg-muted">
                        <img
                          src={image.srcUrl || "/placeholder.svg"}
                          alt={image.alt ?? farm.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Basic Info */}
              <section className="mb-8">
                <h2 className="mb-4 text-lg font-bold text-foreground">基本情報</h2>
                <dl className="space-y-3 text-sm">
                  <div className="flex gap-3">
                    <dt className="flex w-24 flex-shrink-0 items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      住所
                    </dt>
                    <dd className="text-foreground">{farm.location.addressText ?? ""}</dd>
                  </div>
                  {farm.location.phone && (
                    <div className="flex gap-3">
                      <dt className="flex w-24 flex-shrink-0 items-center gap-2 text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        電話
                      </dt>
                      <dd>
                        <a href={`tel:${farm.location.phone}`} className="text-primary hover:underline">
                          {farm.location.phone}
                        </a>
                      </dd>
                    </div>
                  )}
                  {farm.location.officialUrl && (
                    <div className="flex gap-3">
                      <dt className="flex w-24 flex-shrink-0 items-center gap-2 text-muted-foreground">
                        <Globe className="h-4 w-4" />
                        公式サイト
                      </dt>
                      <dd>
                        <a
                          href={farm.location.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          公式サイトを見る
                        </a>
                      </dd>
                    </div>
                  )}
                </dl>
              </section>

              {/* Map & Reviews Links */}
              <section className="mb-8">
                <div className="flex flex-wrap gap-3">
                  {farm.location.googleMapsPlaceUrl && (
                    <Button variant="outline" asChild>
                      <a href={farm.location.googleMapsPlaceUrl} target="_blank" rel="noopener noreferrer">
                        <Map className="mr-2 h-4 w-4" />
                        Googleマップで見る
                      </a>
                    </Button>
                  )}
                  {farm.location.googleMapsReviewsUrl && (
                    <Button variant="outline" asChild>
                      <a href={farm.location.googleMapsReviewsUrl} target="_blank" rel="noopener noreferrer">
                        <Star className="mr-2 h-4 w-4" />
                        口コミを見る
                      </a>
                    </Button>
                  )}
                </div>
              </section>

              {/* Description */}
              <section className="mb-8">
                <h2 className="mb-4 text-lg font-bold text-foreground">詳細情報</h2>
                <div className="overflow-x-auto rounded-xl border border-border bg-card/60 p-4">
                  <div
                    dangerouslySetInnerHTML={{ __html: farm.bodyHtml }}
                    className="farm-content max-w-none text-muted-foreground"
                  />
                </div>
              </section>

              {/* Comments */}
              {farmComments.length > 0 && (
                <section>
                  <h2 className="mb-4 text-lg font-bold text-foreground">コメント ({farmComments.length}件)</h2>
                  <div className="space-y-4">
                    {farmComments.map((comment) => (
                      <div key={comment.id} className="rounded-lg border border-border bg-card p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="font-medium text-card-foreground">{comment.author}</span>
                          <span className="text-xs text-muted-foreground">{comment.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{comment.content}</p>
                        {comment.replies && comment.replies.length > 0 && (
                          <div className="mt-3 space-y-3 border-l-2 border-border pl-4">
                            {comment.replies.map((reply) => (
                              <div key={reply.id}>
                                <div className="mb-1 flex items-center justify-between">
                                  <span className="text-sm font-medium text-card-foreground">{reply.author}</span>
                                  <span className="text-xs text-muted-foreground">{reply.date}</span>
                                </div>
                                <p className="text-sm text-muted-foreground">{reply.content}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar - Quick Access */}
            <aside className="lg:col-span-1">
              <div className="sticky top-20 rounded-lg border border-border bg-card p-4">
                <h3 className="mb-4 font-bold text-card-foreground">アクセス</h3>
                <p className="mb-4 text-sm text-muted-foreground">{farm.location.addressText ?? ""}</p>
                {farm.location.googleMapsPlaceUrl && (
                  <Button className="w-full" asChild>
                    <a href={farm.location.googleMapsPlaceUrl} target="_blank" rel="noopener noreferrer">
                      <Map className="mr-2 h-4 w-4" />
                      地図を開く
                    </a>
                  </Button>
                )}
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
