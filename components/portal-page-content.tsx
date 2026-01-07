"use client"

import { useState, useMemo } from "react"
import { farmsView, locations, getAreaName } from "@/lib/view-data"
import { FarmCard } from "./farm-card"
import { Search, MapPin } from "lucide-react"

export function PortalPageContent() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedArea, setSelectedArea] = useState<string | null>(null)

    const filteredFarms = useMemo(() => {
        const query = searchQuery.trim().toLowerCase()

        return farmsView.filter((farm) => {
            // Area filter
            if (selectedArea && farm.categorySlug !== selectedArea) {
                return false
            }

            // Keyword filter (title or features)
            if (query) {
                const titleMatch = farm.title.toLowerCase().includes(query)
                const featureMatch = farm.features?.some(f => f.includes(query))
                return titleMatch || featureMatch
            }

            return true
        })
    }, [searchQuery, selectedArea])

    const farmCounts = useMemo(() => {
        const counts: Record<string, number> = {}
        farmsView.forEach((farm) => {
            counts[farm.categorySlug] = (counts[farm.categorySlug] || 0) + 1
        })
        return counts
    }, [])

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Portal Hero & Search */}
            <section className="relative w-full overflow-hidden bg-primary pb-16 pt-24 md:pb-24 md:pt-32">
                <div className="absolute inset-0 z-0 opacity-20">
                    {/* Abstract pattern or image could go here */}
                    <div className="h-full w-full bg-[url('/blueberry-farm-landscape-morning-sunshine-family.jpg')] bg-cover bg-center" />
                </div>

                <div className="container relative z-10 mx-auto px-4 text-center">
                    <h1 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl text-shadow-sm">
                        千葉のブルーベリー狩り
                        <span className="block mt-2 text-xl font-normal md:text-2xl">お気に入りの農園を見つけよう</span>
                    </h1>

                    {/* Search Box Card */}
                    <div className="mx-auto mt-8 max-w-3xl rounded-xl bg-white p-4 shadow-xl md:p-6">
                        <div className="flex flex-col gap-4 md:flex-row">
                            {/* Keyword Input */}
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="農園名、特徴（食べ放題など）"
                                    className="w-full rounded-lg border border-input bg-background py-3 pl-10 pr-4 text-base shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            {/* Area Select */}
                            <div className="relative md:w-48">
                                <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                                <select
                                    className="w-full appearance-none rounded-lg border border-input bg-background py-3 pl-10 pr-8 text-base shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                                    value={selectedArea || ""}
                                    onChange={(e) => setSelectedArea(e.target.value || null)}
                                >
                                    <option value="">全てのエリア ({farmsView.length})</option>
                                    {locations.map(loc => (
                                        <option key={loc.slug} value={loc.slug}>
                                            {loc.name} ({farmCounts[loc.slug] || 0})
                                        </option>
                                    ))}
                                </select>
                                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                    ▼
                                </div>
                            </div>
                        </div>

                        {/* Quick Area Tags */}
                        <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
                            <span>人気のエリア:</span>
                            {locations.slice(0, 5).map(loc => (
                                <button
                                    key={loc.slug}
                                    onClick={() => setSelectedArea(loc.slug)}
                                    className={`hover:text-primary underline decoration-dotted ${selectedArea === loc.slug ? 'font-bold text-primary' : ''}`}
                                >
                                    {loc.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Results Grid */}
            <section className="container mx-auto px-4 py-12">
                <div className="mb-6 flex items-end justify-between border-b pb-4">
                    <div>
                        <h2 className="text-2xl font-bold text-foreground">
                            {selectedArea ? `${getAreaName(selectedArea)}の農園` : "農園一覧"}
                        </h2>
                        <p className="text-muted-foreground mt-1">
                            {searchQuery ? `検索: "${searchQuery}"` : "全て表示中"} - {filteredFarms.length}件
                        </p>
                    </div>

                    {/* Sort (Placeholder) */}
                    <div className="hidden md:block text-sm text-muted-foreground">
                        並び替え: <span className="font-medium text-foreground">おすすめ順</span>
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
                            features={farm.features}
                        />
                    ))}
                </div>

                {filteredFarms.length === 0 && (
                    <div className="py-20 text-center text-muted-foreground bg-white rounded-lg shadow-sm border border-dashed">
                        <p className="text-lg">条件に一致する農園が見つかりませんでした。</p>
                        <button
                            onClick={() => { setSearchQuery(""); setSelectedArea(null) }}
                            className="mt-4 text-primary hover:underline"
                        >
                            条件をクリアする
                        </button>
                    </div>
                )}
            </section>
        </div>
    )
}
