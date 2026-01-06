"use client"

import { cn } from "@/lib/utils"

interface Area {
  slug: string
  name: string
}

interface AreaFilterProps {
  areas: Area[]
  selectedArea: string | null
  onAreaChange: (slug: string | null) => void
  farmCounts: Record<string, number>
}

export function AreaFilter({ areas, selectedArea, onAreaChange, farmCounts }: AreaFilterProps) {
  return (
    <div className="border-b border-border bg-background py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 text-sm font-medium text-muted-foreground">エリア:</span>
          <button
            onClick={() => onAreaChange(null)}
            className={cn(
              "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
              selectedArea === null
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80",
            )}
          >
            すべて
          </button>
          {areas.map((area) => (
            <button
              key={area.slug}
              onClick={() => onAreaChange(area.slug)}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                selectedArea === area.slug
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80",
              )}
            >
              {area.name}
              <span className="ml-1 opacity-70">({farmCounts[area.slug] || 0})</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
