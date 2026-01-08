import { NextResponse } from "next/server"
import { getAdminFarmList } from "@/lib/farms"

export async function GET() {
  const farms = await getAdminFarmList()
  return NextResponse.json({ farms })
}
