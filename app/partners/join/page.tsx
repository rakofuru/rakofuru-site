"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function PartnerJoinPage() {
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Mock Submission
        setSubmitted(true)
    }

    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">農園掲載のお申し込み</h1>
                    <p className="text-gray-600 mb-8">
                        「らこふる」への掲載は無料です。以下のフォームよりお申し込みください。<br />
                        内容を確認後、事務局よりご連絡いたします。
                    </p>

                    {submitted ? (
                        <div className="bg-green-50 text-green-800 p-6 rounded-lg text-center">
                            <h3 className="font-bold text-lg mb-2">送信ありがとうございました</h3>
                            <p>お申し込みを受け付けました。担当者からの連絡をお待ちください。</p>
                            <Button className="mt-6" onClick={() => setSubmitted(false)}>戻る</Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold mb-1">農園名</label>
                                <input type="text" required className="w-full rounded-md border border-input p-2" placeholder="〇〇ブルーベリー園" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">代表者名</label>
                                <input type="text" required className="w-full rounded-md border border-input p-2" placeholder="山田 太郎" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">メールアドレス</label>
                                <input type="email" required className="w-full rounded-md border border-input p-2" placeholder="info@example.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">所在地 (または予定地)</label>
                                <input type="text" className="w-full rounded-md border border-input p-2" placeholder="千葉県..." />
                            </div>
                            <div>
                                <label className="block text-sm font-bold mb-1">その他ご質問・ご要望</label>
                                <textarea className="w-full rounded-md border border-input p-2 min-h-[100px]" />
                            </div>
                            <Button type="submit" className="w-full font-bold py-4">
                                お申し込みを送信
                            </Button>
                        </form>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    )
}
