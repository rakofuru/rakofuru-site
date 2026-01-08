import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { getPageBySlug, pages } from "@/lib/data"
import { getSiteUrl } from "@/lib/site"

export const dynamicParams = false

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  return pages.map((page) => ({
    slug: page.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = params
  const page = getPageBySlug(slug)

  if (!page) {
    return {
      title: "ページが見つかりません - らこふる",
    }
  }

  const baseUrl = getSiteUrl()

  return {
    title: `${page.title} - らこふる`,
    alternates: {
      canonical: `${baseUrl}/${page.slug}`,
    },
  }
}

export default async function Page({ params }: PageProps) {
  const { slug } = params
  const page = getPageBySlug(slug)

  if (!page) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <article className="mx-auto max-w-2xl">
            <h1 className="mb-6 text-2xl font-bold text-foreground md:text-3xl">{page.title}</h1>
            <div
              className="space-y-6 text-muted-foreground leading-relaxed"
              dangerouslySetInnerHTML={{ __html: page.bodyHtml }}
            />
          </article>
        </div>
      </main>
      <Footer />
    </div>
  )
}
