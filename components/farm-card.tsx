import Link from "next/link"
import { MapPin, Car, Info } from "lucide-react"

interface FarmCardProps {
  slug: string
  name: string
  thumbnail: string
  areaName: string
  price?: string
  parking?: string
  hours?: string
  features?: string[]
}

export function FarmCard({ slug, name, thumbnail, areaName, price, parking, hours, features = [] }: FarmCardProps) {
  return (
    <Link
      href={`/farms/${slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <img
          src={thumbnail || "/placeholder.svg"}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-primary shadow-sm backdrop-blur-sm">
          {areaName}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-3 text-center text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
          {name}
        </h3>

        <div className="mb-4 flex-1 space-y-2.5">
          {/* Brief Info */}
          <div className="space-y-2 rounded-lg bg-slate-50 p-3 text-sm">
            {price && (
              <div className="flex justify-between items-center border-b border-dashed border-slate-200 pb-1.5 last:border-0 last:pb-0">
                <span className="text-xs font-bold text-muted-foreground">料金</span>
                <span className="font-medium text-slate-700">{price}</span>
              </div>
            )}
            {hours && (
              <div className="flex justify-between items-center border-b border-dashed border-slate-200 pb-1.5 last:border-0 last:pb-0">
                <span className="text-xs font-bold text-muted-foreground">時間</span>
                <span className="font-medium text-slate-700 truncate max-w-[180px] text-right">{hours}</span>
              </div>
            )}
            {parking && (
              <div className="flex justify-between items-center pb-1.5 last:border-0 last:pb-0">
                <span className="text-xs font-bold text-muted-foreground">駐車</span>
                <span className="font-medium text-slate-700 truncate">{parking}</span>
              </div>
            )}
          </div>

          {/* Features Badges */}
          {features.length > 0 && (
            <div className="flex flex-wrap justify-center gap-1.5">
              {features.slice(0, 4).map((tag) => (
                <span key={tag} className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="mt-auto w-full rounded-lg bg-primary py-2 text-center text-sm font-bold text-white opacity-0 transition-opacity group-hover:opacity-100">
          詳細を見る
        </div>
      </div>
    </Link>
  )
}
