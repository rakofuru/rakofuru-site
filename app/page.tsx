import Link from "next/link";
import type { Metadata } from "next";
import type { Farm } from "../lib/types";
import { farms, site } from "../lib/data";

export const metadata: Metadata = {
  alternates: {
    canonical: site.canonicalDomain,
  },
};

type FarmsByCategory = {
  categorySlug: string;
  farms: Farm[];
};

const groupFarmsByCategory = (items: Farm[]): FarmsByCategory[] => {
  const map = new Map<string, Farm[]>();
  const order: string[] = [];

  for (const farm of items) {
    if (!map.has(farm.categorySlug)) {
      map.set(farm.categorySlug, []);
      order.push(farm.categorySlug);
    }
    map.get(farm.categorySlug)?.push(farm);
  }

  return order.map((categorySlug) => ({
    categorySlug,
    farms: map.get(categorySlug) ?? [],
  }));
};

export default function HomePage() {
  const groupedFarms = groupFarmsByCategory(farms);

  return (
    <main>
      <header>
        <h1>{site.name}</h1>
        <p>{site.tagline}</p>
        <p>{site.description}</p>
      </header>

      {groupedFarms.map((group) => (
        <section key={group.categorySlug}>
          <h2>エリア: {group.categorySlug}</h2>
          <ul>
            {group.farms.map((farm) => (
              <li key={farm.id}>
                <article>
                  <h3>
                    <Link href={`/farms/${farm.slug}`}>{farm.title}</Link>
                  </h3>
                  {farm.excerpt ? <p>{farm.excerpt}</p> : null}
                  <p>カテゴリ: {farm.categorySlug}</p>
                </article>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
