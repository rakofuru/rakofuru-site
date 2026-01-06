import { FarmCard } from "./farm-card"
import { areas, farms } from "@/lib/data"

export function FarmListSection() {
  const areaList = areas

  return (
    <section id="farms" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">エリア別に農園をさがす</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            千葉県内のブルーベリー観光農園をエリア別にご紹介。
            お近くの農園を見つけて、ご家族で楽しいブルーベリー狩りをお楽しみください。
          </p>
        </div>

        {areaList.map((area) => {
          const areaFarms = farms.filter((farm) => farm.categorySlug === area.slug)
          if (areaFarms.length === 0) return null

          return (
            <div key={area.slug} className="mb-12 last:mb-0">
              <div className="mb-6 flex items-center gap-3">
                <div className="h-8 w-1 rounded-full bg-primary" />
                <h3 className="text-xl font-bold text-foreground md:text-2xl">{area.name}</h3>
                <span className="text-sm text-muted-foreground">({areaFarms.length}件)</span>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {areaFarms.map((farm) => (
                  <FarmCard
                    key={farm.slug}
                    slug={farm.slug}
                    name={farm.title}
                    excerpt={farm.excerpt ?? ""}
                    thumbnail={farm.heroImage?.srcUrl ?? farm.images[0]?.srcUrl ?? ""}
                    categorySlug={farm.categorySlug}
                    areaName={area.name}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
