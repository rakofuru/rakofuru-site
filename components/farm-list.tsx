"use client"

import { FarmCard } from "./farm-card"

interface Farm {
  slug: string
  name: string
  excerpt: string
  thumbnail: string
  categorySlug: string
}

interface Area {
  slug: string
  name: string
}

interface FarmListProps {
  farms: Farm[]
  areas: Area[]
}

export function FarmList({ farms, areas }: FarmListProps) {
  const getAreaName = (categorySlug: string) => {
    const area = areas.find((a) => a.slug === categorySlug)
    return area?.name || categorySlug
  }

  if (farms.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-muted-foreground">該当する農園が見つかりませんでした</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {farms.map((farm) => (
        <FarmCard
          key={farm.slug}
          slug={farm.slug}
          name={farm.name}
          excerpt={farm.excerpt}
          thumbnail={farm.thumbnail}
          categorySlug={farm.categorySlug}
          areaName={getAreaName(farm.categorySlug)}
        />
      ))}
    </div>
  )
}
