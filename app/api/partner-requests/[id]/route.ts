import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase"

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const supabase = getSupabaseServerClient()
  if (!supabase) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 })
  }

  const { id } = await params
  const updates = await request.json()
  const { status, farm_admin_id } = updates

  const { data, error } = await supabase
    .from("partner_requests")
    .update({
      status,
      farm_admin_id: farm_admin_id ?? null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("*")
    .single()

  if (error) {
    return NextResponse.json({ error: "Failed to update request" }, { status: 500 })
  }

  return NextResponse.json({ request: data })
}
