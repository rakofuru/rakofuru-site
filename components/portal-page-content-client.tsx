"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { FarmCard } from "@/components/farm-card"
import { SearchFilter, type FilterState } from "@/components/search-filter"
import { getAreaName, type FarmView } from "@/lib/view-data"
import { Button } from "@/components/ui/button"
import { LayoutGrid, List } from "lucide-react"

type FarmListItem = FarmView & {
  thumbnailUrl?: string | null
  adminUpdatedAt?: string | null
}

interface PortalPageContentClientProps {
  initialFarms: FarmListItem[]
}

function parseMonthsFromText(text?: string) {
  if (!text) return []
  const matches = Array.from(text.matchAll(/(\d{1,2})月/g))
  return matches.map((match) => Number.parseInt(match[1], 10)).filter((value) => !Number.isNaN(value))
}

export function PortalPageContentClient({ initialFarms }: PortalPageContentClientProps) {
  const [filters, setFilters] = useState<FilterState>({
    keyword: "",
    area: "all",
    priceMax: 3000,
    seasonRange: [6, 9],
    sort: "updated",
    features: {
      parking: false,
      takeout: false,
      reservation: false,
      tabehoudai: false,
      roofShade: false,
    },
  })
  const [viewMode, setViewMode] = useState<"card" | "list">("card")

  const filteredFarms = useMemo(() => {
    const [seasonStart, seasonEnd] = filters.seasonRange
    const keyword = filters.keyword.trim().toLowerCase()

    const filtered = initialFarms.filter((farm) => {
      if (filters.area !== "all" && farm.categorySlug !== filters.area) return false

      if (keyword) {
        const searchText = [
          farm.title,
          farm.pricingBrief,
          farm.parkingBrief,
          farm.hoursBrief,
          farm.features?.join(" "),
          farm.location?.addressText,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
        if (!searchText.includes(keyword)) return false
      }

      if (filters.priceMax < 3000 && farm.priceValue > 0 && farm.priceValue > filters.priceMax) {
        return false
      }

      const seasonMonths = farm.seasonMonths?.length ? farm.seasonMonths : parseMonthsFromText(farm.seasonBrief)
      if (seasonMonths.length > 0) {
        const inRange = seasonMonths.some((month) => month >= seasonStart && month <= seasonEnd)
        if (!inRange) return false
      }

      if (filters.features.parking && !farm.features.includes("駐車場あり")) return false
      if (filters.features.tabehoudai && !farm.features.includes("食べ放題")) return false
      if (filters.features.reservation && !farm.features.includes("要予約")) return false
      if (filters.features.takeout && !(farm.hasTakeout || farm.features.includes("持ち帰り可"))) return false
      if (filters.features.roofShade && !farm.features.some((feature) => feature.includes("雨天") || feature.includes("屋根"))) {
        return false
      }

      return true
    })

    const sorted = [...filtered].sort((a, b) => {
      if (filters.sort === "priceAsc") {
        const aPrice = a.priceValue > 0 ? a.priceValue : Number.MAX_SAFE_INTEGER
        const bPrice = b.priceValue > 0 ? b.priceValue : Number.MAX_SAFE_INTEGER
        return aPrice - bPrice
      }
      if (filters.sort === "priceDesc") {
        const aPrice = a.priceValue > 0 ? a.priceValue : 0
        const bPrice = b.priceValue > 0 ? b.priceValue : 0
        return bPrice - aPrice
      }
      if (filters.sort === "reviews") {
        const aScore = a.reviewWidgetId || a.location.googleMapsReviewsUrl ? 1 : 0
        const bScore = b.reviewWidgetId || b.location.googleMapsReviewsUrl ? 1 : 0
        return bScore - aScore
      }

      const aUpdated = new Date(a.adminUpdatedAt || a.updatedAt || a.publishedAt).getTime()
      const bUpdated = new Date(b.adminUpdatedAt || b.updatedAt || b.publishedAt).getTime()
      return bUpdated - aUpdated
    })

    return sorted
  }, [filters, initialFarms])

  return (
    <section className="bg-slate-50">
      <div className="container mx-auto px-4 py-10">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-bold text-primary">比較で選べる農園ポータル</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            千葉のブルーベリー農園を、条件で比較する
          </h1>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">
            料金・駐車場・営業時期を並べてチェック。あなたに合う農園を効率よく探せます。
          </p>
        </div>

        <SearchFilter filters={filters} onFilterChange={setFilters} />

        <div className="mx-auto mt-8 flex max-w-6xl items-center justify-between px-1">
          <p className="text-sm font-medium text-slate-600">
            {filteredFarms.length}件の農園がヒットしました
          </p>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant={viewMode === "card" ? "default" : "outline"}
              onClick={() => setViewMode("card")}
              className="gap-2"
            >
              <LayoutGrid className="h-4 w-4" />
              カード
            </Button>
            <Button
              size="sm"
              variant={viewMode === "list" ? "default" : "outline"}
              onClick={() => setViewMode("list")}
              className="gap-2"
            >
              <List className="h-4 w-4" />
              リスト
            </Button>
          </div>
        </div>

        {viewMode === "card" ? (
          <div className="mx-auto mt-6 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredFarms.map((farm) => (
              <FarmCard
                key={farm.id}
                slug={farm.slug}
                name={farm.title}
                thumbnail={farm.thumbnailUrl || farm.heroImage?.srcUrl || "/placeholder.svg"}
                areaName={getAreaName(farm.categorySlug)}
                price={farm.pricingBrief}
                parking={farm.parkingBrief}
                hours={farm.hoursBrief}
                season={farm.seasonBrief}
                features={farm.features}
                hasReviews={Boolean(farm.reviewWidgetId || farm.location.googleMapsReviewsUrl)}
              />
            ))}
          </div>
        ) : (
          <div className="mx-auto mt-6 max-w-6xl space-y-3">
            <div className="hidden grid-cols-[1.8fr_1fr_1fr_1.4fr_1fr] items-center gap-4 rounded-xl bg-slate-100 px-4 py-3 text-xs font-bold text-slate-500 md:grid">
              <span>農園</span>
              <span>料金</span>
              <span>駐車場</span>
              <span>営業時期</span>
              <span>特徴</span>
            </div>
            {filteredFarms.map((farm) => (
              <Link
                key={farm.id}
                href={`/farms/${farm.slug}`}
                className="flex flex-col gap-3 rounded-xl border border-border bg-white px-4 py-4 shadow-sm transition hover:border-primary/40 md:grid md:grid-cols-[1.8fr_1fr_1fr_1.4fr_1fr] md:items-center md:gap-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={farm.thumbnailUrl || farm.heroImage?.srcUrl || "/placeholder.svg"}
                    alt={farm.title}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                  <div>
                    <p className="text-sm font-bold text-slate-900">{farm.title}</p>
                    <p className="text-xs text-muted-foreground">{getAreaName(farm.categorySlug)}</p>
                  </div>
                </div>
                <div className="text-sm font-semibold text-slate-700">{farm.pricingBrief || "要確認"}</div>
                <div className="text-sm text-slate-700">{farm.parkingBrief || "要確認"}</div>
                <div className="text-sm text-slate-700">
                  <span className="rounded bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">
                    {farm.seasonBrief || "期間要確認"}
                  </span>
                  <span className="ml-2 text-xs text-muted-foreground">{farm.hoursBrief}</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {farm.features.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full border border-primary/10 bg-primary/5 px-2 py-1 text-[10px] font-semibold text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
