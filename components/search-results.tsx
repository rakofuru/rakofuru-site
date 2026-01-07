"use client"

import { useState, useMemo } from "react"
import { SearchHero } from "./search-hero"
import { AreaFilter } from "./area-filter"
import { FarmList } from "./farm-list"
import { FarmListSection } from "./farm-list-section"
import { areas, farms, searchIndex } from "@/lib/data"

export function SearchResults() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedArea, setSelectedArea] = useState<string | null>(null)

  const filteredFarms = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    const matchedSlugs =
      query.length === 0
        ? null
        : new Set(
            searchIndex
              .filter((entry) => entry.type === "farm" && entry.text.toLowerCase().includes(query))
              .map((entry) => entry.slug),
          )

    return farms.filter((farm) => {
      // Area filter
      if (selectedArea && farm.categorySlug !== selectedArea) {
        return false
      }

      if (!matchedSlugs) {
        return true
      }

      return matchedSlugs.has(farm.slug)
    })
  }, [searchQuery, selectedArea])

  const farmListItems = useMemo(
    () =>
      filteredFarms.map((farm) => ({
        slug: farm.slug,
        name: farm.title,
        excerpt: farm.excerpt ?? "",
        thumbnail: farm.heroImage?.srcUrl ?? farm.images[0]?.srcUrl ?? "",
        categorySlug: farm.categorySlug,
      })),
    [filteredFarms],
  )

  // Count farms per area (from all farms, not filtered)
  const farmCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    farms.forEach((farm) => {
      counts[farm.categorySlug] = (counts[farm.categorySlug] || 0) + 1
    })
    return counts
  }, [])

  const isFiltered = searchQuery.trim().length > 0 || selectedArea !== null

  return (
    <>
      <SearchHero searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <AreaFilter
        areas={areas}
        selectedArea={selectedArea}
        onAreaChange={setSelectedArea}
        farmCounts={farmCounts}
      />
      {isFiltered ? (
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {filteredFarms.length}件の農園
                {selectedArea && ` - ${areas.find((a) => a.slug === selectedArea)?.name}`}
                {searchQuery && ` - 「${searchQuery}」`}
              </p>
            </div>
            <FarmList farms={farmListItems} areas={areas} />
          </div>
        </section>
      ) : (
        <FarmListSection />
      )}
    </>
  )
}
