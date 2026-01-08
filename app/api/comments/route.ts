import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const farmSlug = searchParams.get("farmSlug")
  if (!farmSlug) {
    return NextResponse.json({ comments: [] })
  }

  const supabase = getSupabaseServerClient()
  if (!supabase) {
    return NextResponse.json({ comments: [] })
  }

  const { data, error } = await supabase
    .from("comments")
    .select("id, farm_slug, author_name, body, created_at, parent_id")
    .eq("farm_slug", farmSlug)
    .eq("is_public", true)
    .order("created_at", { ascending: true })

  if (error) {
    return NextResponse.json({ comments: [] })
  }

  return NextResponse.json({
    comments: data.map((row) => ({
      id: row.id,
      farmSlug: row.farm_slug,
      authorName: row.author_name,
      body: row.body,
      createdAt: row.created_at,
      parentId: row.parent_id,
    })),
  })
}

export async function POST(request: Request) {
  const supabase = getSupabaseServerClient()
  if (!supabase) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 })
  }

  const payload = await request.json()
  const { farmSlug, authorName, body, parentId } = payload

  if (!farmSlug || !authorName || !body) {
    return NextResponse.json({ error: "Required fields missing" }, { status: 400 })
  }

  const { data, error } = await supabase
    .from("comments")
    .insert({
      farm_slug: farmSlug,
      author_name: authorName,
      body,
      parent_id: parentId ?? null,
      is_public: true,
    })
    .select("id, farm_slug, author_name, body, created_at, parent_id")
    .single()

  if (error || !data) {
    return NextResponse.json({ error: "Failed to submit comment" }, { status: 500 })
  }

  return NextResponse.json({
    comment: {
      id: data.id,
      farmSlug: data.farm_slug,
      authorName: data.author_name,
      body: data.body,
      createdAt: data.created_at,
      parentId: data.parent_id,
    },
  })
}
