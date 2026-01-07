interface FarmHeroProps {
  name: string
  heroImage: string
  categorySlug: string
}

const categoryLabels: Record<string, string> = {
  chiba: "千葉エリア",
  "chiba-city": "千葉市エリア",
  boso: "房総エリア",
  "north-chiba": "北総エリア",
}

export function FarmHero({ name, heroImage, categorySlug }: FarmHeroProps) {
  return (
    <section className="relative">
      <div className="aspect-[21/9] w-full overflow-hidden md:aspect-[3/1]">
        <img src={heroImage || "/placeholder.svg"} alt={name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 container mx-auto px-4 pb-8">
        <span className="mb-3 inline-block rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground">
          {categoryLabels[categorySlug] || categorySlug}
        </span>
        <h1 className="text-balance text-3xl font-bold text-card md:text-4xl lg:text-5xl">{name}</h1>
      </div>
    </section>
  )
}
