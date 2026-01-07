import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
    return (
        <div className="flex min-h-screen flex-col bg-slate-50">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-12">
                <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 p-8 space-y-8">
                    <div className="text-center border-b border-gray-100 pb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">お問い合わせ</h1>
                        <p className="text-gray-600">
                            お問い合わせ内容に応じて、以下の窓口・フォームをご利用ください。
                        </p>
                    </div>

                    {/* Farm Inquiry */}
                    <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                        <h2 className="text-lg font-bold text-blue-900 mb-2">🫐 掲載農園へのお問い合わせ</h2>
                        <p className="text-sm text-blue-800 mb-4">
                            営業時間、予約状況、料金などの詳細については、各農園へ直接お問い合わせください。<br />
                            各農園の詳細ページにある「電話で問い合わせ」または「公式サイト」からご連絡いただけます。
                        </p>
                        <Button variant="outline" className="bg-white hover:bg-blue-50 w-full" asChild>
                            <a href="/">農園を探す</a>
                        </Button>
                    </div>

                    {/* Site Inquiry */}
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 mb-4">💻 サイト「らこふる」へのお問い合わせ</h2>
                        <p className="text-sm text-muted-foreground mb-6">
                            当サイトへの掲載依頼、取材、広告、不具合のご報告は以下のフォームよりお願いいたします。
                        </p>

                        <form className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold">お名前</label>
                                    <input type="text" className="w-full border rounded p-2" placeholder="山田 太郎" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold">メールアドレス</label>
                                    <input type="email" className="w-full border rounded p-2" placeholder="info@example.com" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold">お問い合わせ内容</label>
                                <textarea className="w-full border rounded p-2 h-32" placeholder="ご用件をご記入ください"></textarea>
                            </div>
                            <Button type="submit" className="w-full py-6 font-bold text-lg">
                                送信する
                            </Button>
                        </form>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
