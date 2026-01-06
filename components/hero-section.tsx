export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="/blueberry-farm-landscape-morning-sunshine-family.jpg" alt="ブルーベリー農園の風景" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-foreground/40" />
      </div>
      <div className="relative z-10 container mx-auto px-4 py-24 md:py-32 lg:py-40">
        <div className="max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/90 px-4 py-1.5 text-sm font-medium text-primary-foreground">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
              <circle cx="12" cy="10" r="6" />
              <path d="M12 4 C10 2, 14 2, 12 4" />
            </svg>
            千葉県のブルーベリー農園ポータル
          </div>
          <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-card md:text-5xl lg:text-6xl">
            千葉県のブルーベリー農園さがしは
            <span className="mt-2 block text-primary-foreground">『らこふる』</span>
            <span className="block">で</span>
          </h1>
          <p className="mb-8 text-pretty text-lg text-card/90 md:text-xl">
            家族で楽しめるブルーベリー狩りスポットを
            <br className="hidden sm:block" />
            エリア別にご紹介します
          </p>
          <a
            href="#farms"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl"
          >
            農園をさがす
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
