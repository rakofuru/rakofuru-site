import { NextResponse } from "next/server"
import { getAdminFarmDetail, upsertFarmAdmin } from "@/lib/farms"

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const farm = await getAdminFarmDetail(id)
  if (!farm) {
    return NextResponse.json({ error: "Farm not found" }, { status: 404 })
  }
  return NextResponse.json({ farm })
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const updates = await request.json()
    const farm = await upsertFarmAdmin(id, updates)
    return NextResponse.json({ farm })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update farm", details: String(error) }, { status: 500 })
  }
}
