import { Button } from "@/components/ui/button"

interface FarmAccessProps {
  address: string
  phone: string
  website?: string
  googleMapsUrl?: string
  googleReviewsUrl?: string
}

export function FarmAccess({ address, phone, website, googleMapsUrl, googleReviewsUrl }: FarmAccessProps) {
  return (
    <section className="py-8">
      <h2 className="mb-4 text-xl font-bold text-foreground">アクセス情報</h2>
      <div className="rounded-xl bg-muted/50 p-6">
        <dl className="space-y-4">
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
            <dt className="w-24 shrink-0 font-medium text-foreground">住所</dt>
            <dd className="text-muted-foreground">{address}</dd>
          </div>
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
            <dt className="w-24 shrink-0 font-medium text-foreground">電話番号</dt>
            <dd>
              <a href={`tel:${phone}`} className="text-primary hover:underline">
                {phone}
              </a>
            </dd>
          </div>
          {website && (
            <div className="flex flex-col gap-1 sm:flex-row sm:gap-4">
              <dt className="w-24 shrink-0 font-medium text-foreground">公式サイト</dt>
              <dd>
                <a href={website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  {website}
                </a>
              </dd>
            </div>
          )}
        </dl>

        <div className="mt-6 flex flex-wrap gap-3">
          {googleMapsUrl && (
            <Button asChild variant="outline" size="sm">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                Googleマップで見る
              </a>
            </Button>
          )}
          {googleReviewsUrl && (
            <Button asChild variant="outline" size="sm">
              <a
                href={googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                口コミを見る
              </a>
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
