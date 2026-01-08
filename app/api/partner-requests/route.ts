import { NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase"

export async function GET() {
  const supabase = getSupabaseServerClient()
  if (!supabase) {
    return NextResponse.json({ requests: [] })
  }

  const { data, error } = await supabase
    .from("partner_requests")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    return NextResponse.json({ error: "Failed to load requests" }, { status: 500 })
  }

  return NextResponse.json({ requests: data })
}

export async function POST(request: Request) {
  const supabase = getSupabaseServerClient()
  if (!supabase) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 })
  }

  const payload = await request.json()
  const { farmName, ownerName, email, phone, websiteUrl, locationText, notes } = payload

  if (!farmName || !ownerName || !email) {
    return NextResponse.json({ error: "Required fields missing" }, { status: 400 })
  }

  const { data, error } = await supabase
    .from("partner_requests")
    .insert({
      farm_name: farmName,
      owner_name: ownerName,
      email,
      phone,
      website_url: websiteUrl,
      location_text: locationText,
      notes,
    })
    .select("*")
    .single()

  if (error) {
    return NextResponse.json({ error: "Failed to submit request" }, { status: 500 })
  }

  return NextResponse.json({ request: data })
}
