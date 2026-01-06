import Link from "next/link"
import { MapPin } from "lucide-react"

interface FarmCardProps {
  slug: string
  name: string
  excerpt: string
  thumbnail: string
  categorySlug: string
  areaName: string
}

export function FarmCard({ slug, name, excerpt, thumbnail, areaName }: FarmCardProps) {
  return (
    <Link
      href={`/farms/${slug}`}
      className="group flex gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/30 hover:bg-accent/30"
    >
      {/* Thumbnail */}
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md md:h-24 md:w-24">
        <img src={thumbnail || "/placeholder.svg"} alt={name} className="h-full w-full object-cover" />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <h3 className="mb-1 text-base font-bold text-card-foreground group-hover:text-primary md:text-lg">{name}</h3>
        <div className="mb-2 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span>{areaName}</span>
        </div>
        <p className="line-clamp-2 text-sm text-muted-foreground">{excerpt}</p>
      </div>
    </Link>
  )
}
