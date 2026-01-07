"use client"

import { useState, useMemo } from "react"
import { farmsView, getAreaName } from "@/lib/view-data"
import { FarmCard } from "./farm-card"
import { SearchFilter, FilterState } from "./search-filter"
import { MapPin } from "lucide-react"

export function PortalPageContent() {
    const [filters, setFilters] = useState<FilterState>({
        keyword: "",
        priceMax: 3000,
        season: "all",
        features: {
            parking: false,
            takeout: false,
            reservation: false,
            tabehoudai: false
        }
    })

    const filteredFarms = useMemo(() => {
        return farmsView.filter((farm) => {
            // 1. Keyword
            if (filters.keyword) {
                const query = filters.keyword.toLowerCase()
                const titleMatch = farm.title.toLowerCase().includes(query)
                const featureMatch = farm.features?.some(f => f.includes(query))
                if (!titleMatch && !featureMatch) return false
            }

            // 2. Price Max (Slider)
            // Use priceValue if available.
            // If priceValue is 0, we treat it as unknown.
            // Logic: Show if priceValue <= filters.priceMax OR priceValue is unknown (0)?
            // Better UX: If filtered low, maybe hide expensive ones.
            if (filters.priceMax < 3000) {
                if (farm.priceValue > filters.priceMax) return false;
            }

            // Tabehoudai (Feature Check)
            if (filters.features.tabehoudai && !farm.features.includes("食べ放題")) return false;


            // 3. Season
            if (filters.season !== "all") {
                if (!farm.seasonBrief.includes(filters.season)) return false;
            }

            // 4. Features
            if (filters.features.parking && !farm.features.includes("駐車場あり")) return false;
            if (filters.features.takeout && !farm.hasTakeout) return false;
            if (filters.features.reservation && !farm.features.includes("要予約")) return false;

            return true
        })
    }, [filters])

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Portal Hero & Search */}
            <section className="relative w-full overflow-hidden bg-primary pb-16 pt-12 md:pb-24 md:pt-20">
                <div className="absolute inset-0 z-0 opacity-20">
                    <div className="h-full w-full bg-[url('/blueberry-farm-landscape-morning-sunshine-family.jpg')] bg-cover bg-center" />
                </div>

                <div className="container relative z-10 mx-auto px-4 text-center">
                    <div className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md border border-white/20 mb-6">
                        🫐 千葉県のブルーベリー狩り専門ポータル
                    </div>
                    <h1 className="mb-8 text-3xl font-bold tracking-tight text-white md:text-5xl lg:text-5xl text-shadow-sm leading-tight">
                        週末は、農園に行こう。<br />
                        <span className="text-xl font-normal md:text-2xl opacity-90 block mt-4">
                            あなた好みのブルーベリー農園が必ず見つかる
                        </span>
                    </h1>

                    {/* Facade Search */}
                    <div className="text-left">
                        <SearchFilter onFilterChange={setFilters} filters={filters} />
                    </div>
                </div>
            </section>

            {/* Results Grid */}
            <section className="container mx-auto px-4 py-12">
                <div className="mb-6 flex items-end justify-between border-b border-gray-200 pb-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            条件に合う農園
                        </h2>
                        <p className="text-muted-foreground mt-1">
                            {filteredFarms.length}件の農園が見つかりました
                        </p>
                    </div>

                    <div className="hidden md:block text-sm text-muted-foreground">
                        情報更新日: 2024.01.07
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                    {filteredFarms.map(farm => (
                        <FarmCard
                            key={farm.id}
                            slug={farm.slug}
                            name={farm.title}
                            thumbnail={farm.heroImage?.srcUrl || ""}
                            areaName={getAreaName(farm.categorySlug)}
                            price={farm.pricingBrief}
                            parking={farm.parkingBrief}
                            hours={farm.hoursBrief}
                            season={farm.seasonBrief}
                            features={farm.features}
                        />
                    ))}
                </div>

                {filteredFarms.length === 0 && (
                    <div className="py-20 text-center text-muted-foreground bg-white rounded-lg shadow-sm border border-dashed">
                        <p className="text-lg font-medium">条件に一致する農園が見つかりませんでした。</p>
                        <p className="text-sm mt-2">条件を変えて再度検索してみてください。</p>
                        <button
                            onClick={() => setFilters({
                                keyword: "", priceMax: 3000, season: "all",
                                features: { parking: false, takeout: false, reservation: false, tabehoudai: false }
                            })}
                            className="mt-6 rounded-full bg-primary px-6 py-2 text-white hover:bg-primary/90 transition-colors"
                        >
                            条件をリセット
                        </button>
                    </div>
                )}
            </section>
        </div>
    )
}
