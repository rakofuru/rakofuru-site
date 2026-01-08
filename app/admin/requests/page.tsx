"use client"

import { useEffect, useMemo, useState } from "react"
import { Button } from "@/components/ui/button"

type PartnerRequest = {
  id: string
  farm_name: string | null
  owner_name: string | null
  email: string | null
  phone: string | null
  website_url: string | null
  location_text: string | null
  notes: string | null
  status: "pending" | "approved" | "rejected"
  created_at: string
  farm_admin_id: string | null
}

type FarmOption = {
  id: string
  title: string
}

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState<PartnerRequest[]>([])
  const [farms, setFarms] = useState<FarmOption[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [requestsRes, farmsRes] = await Promise.all([fetch("/api/partner-requests"), fetch("/api/admin/farms")])
        const requestsData = (await requestsRes.json()) as { requests: PartnerRequest[] }
        const farmsData = (await farmsRes.json()) as { farms: FarmOption[] }
        setRequests(requestsData.requests || [])
        setFarms(farmsData.farms || [])
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  const pendingCount = useMemo(() => requests.filter((req) => req.status === "pending").length, [requests])

  const updateRequest = async (id: string, status: PartnerRequest["status"], farmAdminId?: string | null) => {
    try {
      const response = await fetch(`/api/partner-requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, farm_admin_id: farmAdminId ?? null }),
      })
      if (!response.ok) return
      const data = (await response.json()) as { request: PartnerRequest }
      setRequests((prev) => prev.map((req) => (req.id === id ? data.request : req)))
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">オーナー申請一覧</h2>
          <p className="text-muted-foreground">申請内容を確認し、承認・却下を行います。</p>
        </div>
        <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600">
          Pending: {pendingCount}
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 font-bold text-slate-700">
            <tr>
              <th className="px-6 py-4">申請日</th>
              <th className="px-6 py-4">農園名</th>
              <th className="px-6 py-4">代表者</th>
              <th className="px-6 py-4">連絡先</th>
              <th className="px-6 py-4">備考</th>
              <th className="px-6 py-4">紐付け</th>
              <th className="px-6 py-4">ステータス</th>
              <th className="px-6 py-4 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {isLoading && (
              <tr>
                <td className="px-6 py-6 text-muted-foreground" colSpan={8}>
                  読み込み中...
                </td>
              </tr>
            )}
            {!isLoading &&
              requests.map((req) => (
                <tr key={req.id} className="transition-colors hover:bg-slate-50">
                  <td className="px-6 py-4 text-slate-500">
                    {new Date(req.created_at).toLocaleDateString("ja-JP")}
                  </td>
                  <td className="px-6 py-4 font-bold">{req.farm_name || "-"}</td>
                  <td className="px-6 py-4">{req.owner_name || "-"}</td>
                  <td className="px-6 py-4 text-sm text-blue-600">
                    <div>{req.email || "-"}</div>
                    <div className="text-xs text-slate-400">{req.phone || ""}</div>
                  </td>
                  <td className="px-6 py-4 text-xs text-slate-500">{req.notes || "-"}</td>
                  <td className="px-6 py-4">
                    <select
                      className="w-40 rounded border border-slate-200 bg-white p-1 text-xs"
                      value={req.farm_admin_id ?? ""}
                      onChange={(event) => updateRequest(req.id, req.status, event.target.value || null)}
                    >
                      <option value="">未紐付け</option>
                      {farms.map((farm) => (
                        <option key={farm.id} value={farm.id}>
                          {farm.title}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        req.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : req.status === "rejected"
                            ? "bg-gray-200 text-gray-600"
                            : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {req.status === "approved" ? "承認済み" : req.status === "rejected" ? "却下" : "保留"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" onClick={() => updateRequest(req.id, "approved", req.farm_admin_id)}>
                        承認
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => updateRequest(req.id, "rejected")}>
                        却下
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
