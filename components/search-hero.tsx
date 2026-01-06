"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface SearchHeroProps {
  searchQuery: string
  onSearchChange: (value: string) => void
}

export function SearchHero({ searchQuery, onSearchChange }: SearchHeroProps) {
  return (
    <section className="border-b border-border bg-muted/30 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="mb-2 text-xl font-bold text-foreground md:text-2xl">千葉県のブルーベリー農園さがし</h1>
          <p className="mb-6 text-sm text-muted-foreground">家族で楽しめるブルーベリー狩りスポットをご紹介</p>

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="農園名やキーワードで検索..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="h-11 pl-10 text-base"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
