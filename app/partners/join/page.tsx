"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

type FormState = {
  farmName: string
  ownerName: string
  email: string
  phone: string
  websiteUrl: string
  locationText: string
  notes: string
}

const initialState: FormState = {
  farmName: "",
  ownerName: "",
  email: "",
  phone: "",
  websiteUrl: "",
  locationText: "",
  notes: "",
}

export default function PartnerJoinPage() {
  const [formState, setFormState] = useState<FormState>(initialState)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (field: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/partner-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      })
      if (!response.ok) {
        throw new Error("Failed to submit")
      }
      setSubmitted(true)
      setFormState(initialState)
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="container mx-auto flex-1 px-4 py-12">
        <div className="mx-auto max-w-2xl rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">農園掲載のお申し込み</h1>
          <p className="mb-8 text-gray-600">
            「らこふる」への掲載は無料です。こちらはログインではなく申請フォームです。内容を確認後、事務局よりご連絡します。
          </p>

          {submitted ? (
            <div className="rounded-lg bg-green-50 p-6 text-center text-green-800">
              <h3 className="mb-2 text-lg font-bold">送信ありがとうございました</h3>
              <p>お申し込みを受け付けました。担当者からの連絡をお待ちください。</p>
              <Button className="mt-6" onClick={() => setSubmitted(false)}>
                戻る
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="mb-1 block text-sm font-bold">農園名</label>
                <input
                  type="text"
                  required
                  className="w-full rounded-md border border-input p-2"
                  placeholder="例: さくらブルーベリー園"
                  value={formState.farmName}
                  onChange={handleChange("farmName")}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold">代表者名</label>
                <input
                  type="text"
                  required
                  className="w-full rounded-md border border-input p-2"
                  placeholder="例: 山田 太郎"
                  value={formState.ownerName}
                  onChange={handleChange("ownerName")}
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-bold">メールアドレス</label>
                  <input
                    type="email"
                    required
                    className="w-full rounded-md border border-input p-2"
                    placeholder="info@example.com"
                    value={formState.email}
                    onChange={handleChange("email")}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-bold">電話番号</label>
                  <input
                    type="tel"
                    className="w-full rounded-md border border-input p-2"
                    placeholder="090-1234-5678"
                    value={formState.phone}
                    onChange={handleChange("phone")}
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold">公式URL</label>
                <input
                  type="url"
                  className="w-full rounded-md border border-input p-2"
                  placeholder="https://example.com"
                  value={formState.websiteUrl}
                  onChange={handleChange("websiteUrl")}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold">所在地 (または予定地)</label>
                <input
                  type="text"
                  className="w-full rounded-md border border-input p-2"
                  placeholder="千葉県〇〇市..."
                  value={formState.locationText}
                  onChange={handleChange("locationText")}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-bold">その他ご質問・ご要望</label>
                <textarea
                  className="min-h-[100px] w-full rounded-md border border-input p-2"
                  value={formState.notes}
                  onChange={handleChange("notes")}
                />
              </div>
              <Button type="submit" className="w-full py-4 font-bold" disabled={isSubmitting}>
                申し込みを送信
              </Button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
