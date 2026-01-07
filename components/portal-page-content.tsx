"use client"

import { useState, useMemo } from "react"
import { farmsView, getAreaName } from "@/lib/view-data"
import { FarmCard } from "./farm-card"
import { SearchFilter, FilterState } from "./search-filter"
import { MapPin } from "lucide-react"

export function PortalPageContent() {
    const [filters, setFilters] = useState<FilterState>({
        keyword: "",
        priceRange: "all",
        season: "all",
        features: {
            parking: false,
            takeout: false,
            reservation: false
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

            // 2. Price Range
            if (filters.priceRange !== "all") {
                if (filters.priceRange === "under1500") {
                    if (!farm.priceValue || farm.priceValue > 1500) return false;
                }
                if (filters.priceRange === "over1500") {
                    // not implemented logic, but assuming just NOT under 1500 or logic similar
                    // Actually, strict logic:
                    // Let's say over1500 means >= 1500.
                    // But the UI was under/1000-2000...
                    // Let's stick to the simple filter in SearchFilter: "under1500", "tabehoudai"
                }
                if (filters.priceRange === "tabehoudai") {
                    if (!farm.features.includes("食べ放題")) return false;
                }
            }

            // 3. Season
            if (filters.season !== "all") {
                // Heuristic: check if seasonBrief includes the month
                // "current" logic needs a real date, but for now let's assume "seasonBrief" has current month
                // or just skip 'current' for static demo if not feasible.
                // Let's match string.
                if (filters.season === "june" && !farm.seasonBrief.includes("6月")) return false;
                if (filters.season === "july" && !farm.seasonBrief.includes("7月")) return false;
                if (filters.season === "august" && !farm.seasonBrief.includes("8月")) return false;
                if (filters.season === "current") {
                    // Mock: assume June for demo
                    if (!farm.seasonBrief.includes("6月") && !farm.seasonBrief.includes("7月")) return false;
                }
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
                        🍓 千葉県のブルーベリー狩り専門ポータル
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

                <div className="space-y-4">
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
                                keyword: "", priceRange: "all", season: "all",
                                features: { parking: false, takeout: false, reservation: false }
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
