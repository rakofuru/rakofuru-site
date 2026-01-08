import Link from "next/link"
import { MapPin, Car, Star } from "lucide-react"

interface FarmCardProps {
  slug: string
  name: string
  thumbnail: string
  areaName: string
  price?: string
  parking?: string
  hours?: string
  season?: string
  features?: string[]
  hasReviews?: boolean
}

function formatPrice(price?: string) {
  if (!price) return "要確認"
  const match = price.match(/(\d{3,5})/)
  if (!match) return price
  return `${Number(match[1]).toLocaleString()}円〜`
}

export function FarmCard({
  slug,
  name,
  thumbnail,
  areaName,
  price,
  parking,
  hours,
  season,
  features = [],
  hasReviews,
}: FarmCardProps) {
  return (
    <Link
      href={`/farms/${slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-all hover:scale-[1.01] hover:shadow-lg sm:h-48 sm:flex-row"
    >
      <div className="relative h-48 w-full shrink-0 overflow-hidden bg-muted sm:h-full sm:w-48 lg:w-56">
        <img
          src={thumbnail || "/placeholder.svg"}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-2 top-2 rounded-md border border-white/10 bg-black/60 px-2 py-1 text-xs font-bold text-white shadow-sm backdrop-blur-sm">
          <MapPin className="mr-1 inline-block h-3 w-3" />
          {areaName}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4 sm:px-5 sm:py-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 text-lg font-bold text-gray-900 group-hover:text-primary sm:text-lg md:text-xl">
            {name}
          </h3>
          {season && (
            <span className="hidden shrink-0 items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 sm:inline-flex">
              {season}
            </span>
          )}
        </div>

        <div className="mt-3 grid flex-1 grid-cols-2 gap-x-6 gap-y-2 text-sm">
          <div className="col-span-2 border-b border-dashed border-slate-200 pb-1 sm:col-span-1 sm:border-0 sm:pb-0">
            <span className="block text-[10px] font-bold text-muted-foreground">料金 (大人)</span>
            <span className="text-lg font-bold text-slate-700">{formatPrice(price)}</span>
          </div>

          <div className="col-span-2 border-b border-dashed border-slate-200 pb-1 sm:col-span-1 sm:border-0 sm:pb-0">
            <span className="block text-[10px] font-bold text-muted-foreground">駐車場</span>
            <div className="flex items-center gap-1.5 font-medium text-slate-700">
              <Car className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="truncate">{parking || "要確認"}</span>
            </div>
          </div>

          <div className="col-span-2">
            <span className="block text-[10px] font-bold text-muted-foreground">営業時間・期間</span>
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <span className="rounded bg-slate-100 px-1.5 py-0.5 text-slate-800">
                {season || "期間要確認"}
              </span>
              <span className="truncate">{hours || "営業時間は要確認"}</span>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
          <div className="flex h-6 flex-wrap gap-1.5 overflow-hidden">
            {features.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-sm border border-primary/10 bg-primary/5 px-1.5 py-0.5 text-[10px] font-medium text-primary"
              >
                {tag}
              </span>
            ))}
            {features.length > 3 && <span className="text-[10px] text-muted-foreground">...</span>}
          </div>
          {hasReviews && (
            <div className="hidden items-center gap-1 text-xs font-bold text-amber-600 sm:flex">
              <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
              口コミあり
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
