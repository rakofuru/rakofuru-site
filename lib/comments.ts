import "server-only"

import { getSupabaseServerClient } from "@/lib/supabase"

export type CommentRecord = {
  id: string
  farmSlug: string
  authorName: string
  body: string
  createdAt: string
  parentId: string | null
}

export async function getCommentsForFarm(slug: string): Promise<CommentRecord[]> {
  const supabase = getSupabaseServerClient()
  if (!supabase) return []

  const { data, error } = await supabase
    .from("comments")
    .select("id, farm_slug, author_name, body, created_at, parent_id")
    .eq("farm_slug", slug)
    .eq("is_public", true)
    .order("created_at", { ascending: true })

  if (error || !data) return []

  return data.map((row) => ({
    id: row.id,
    farmSlug: row.farm_slug,
    authorName: row.author_name,
    body: row.body,
    createdAt: row.created_at,
    parentId: row.parent_id,
  }))
}
