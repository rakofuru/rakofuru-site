import Link from "next/link"
import { MapPin, Car } from "lucide-react"

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
}

export function FarmCard({ slug, name, thumbnail, areaName, price, parking, hours, season, features = [] }: FarmCardProps) {
  return (
    <Link
      href={`/farms/${slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-all hover:scale-[1.01] hover:shadow-lg sm:flex-row h-full sm:h-48"
    >
      {/* Thumbnail */}
      <div className="relative h-48 w-full shrink-0 overflow-hidden sm:h-full sm:w-48 lg:w-56 bg-muted">
        <img
          src={thumbnail || "/placeholder.svg"}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-2 top-2 rounded-md bg-black/60 px-2 py-1 text-xs font-bold text-white backdrop-blur-sm shadow-sm border border-white/10">
          <MapPin className="mr-1 inline-block h-3 w-3" />
          {areaName}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 sm:py-3 sm:px-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary sm:text-lg md:text-xl line-clamp-1">
            {name}
          </h3>
          {season && (
            <span className="hidden sm:inline-flex shrink-0 items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
              {season}
            </span>
          )}
        </div>

        {/* Specs Grid */}
        <div className="mt-3 grid flex-1 grid-cols-2 gap-x-6 gap-y-2 text-sm">
          {/* Price */}
          <div className="col-span-2 sm:col-span-1 border-b border-dashed border-slate-200 pb-1 sm:border-0 sm:pb-0">
            <span className="block text-[10px] font-bold text-muted-foreground">料金 (大人)</span>
            <span className="font-bold text-lg text-slate-700">
              {price ? `¥${price.replace(/[^0-9]/g, '')}` : '-'}
              <span className="text-xs font-normal text-muted-foreground ml-1">~</span>
            </span>
          </div>

          {/* Parking */}
          <div className="col-span-2 sm:col-span-1 border-b border-dashed border-slate-200 pb-1 sm:border-0 sm:pb-0">
            <span className="block text-[10px] font-bold text-muted-foreground">駐車場</span>
            <div className="flex items-center gap-1.5 font-medium text-slate-700">
              <Car className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="truncate">{parking || "詳細要確認"}</span>
            </div>
          </div>

          {/* Hours */}
          <div className="col-span-2 sm:col-span-2">
            <span className="block text-[10px] font-bold text-muted-foreground">営業時間・期間</span>
            <div className="flex items-center gap-1.5 text-xs text-slate-600">
              <span className="font-medium bg-slate-100 px-1.5 py-0.5 rounded text-slate-800">{season || "期間要確認"}</span>
              <span className="truncate">{hours}</span>
            </div>
          </div>
        </div>

        {/* Footer / Tags */}
        <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
          <div className="flex flex-wrap gap-1.5 overflow-hidden h-6">
            {features.slice(0, 3).map((tag) => (
              <span key={tag} className="inline-flex items-center rounded-sm bg-primary/5 px-1.5 py-0.5 text-[10px] font-medium text-primary border border-primary/10">
                {tag}
              </span>
            ))}
            {features.length > 3 && <span className="text-[10px] text-muted-foreground leading-4">...</span>}
          </div>
          <div className="shrink-0 text-xs font-bold text-primary opacity-0 transition-opacity group-hover:opacity-100 hidden sm:block">
            詳細 →
          </div>
        </div>
      </div>
    </Link>
  )
}
