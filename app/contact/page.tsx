import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <Header />
      <main className="container mx-auto flex-1 px-4 py-12">
        <div className="mx-auto max-w-2xl space-y-8 rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="border-b border-gray-100 pb-8 text-center">
            <h1 className="mb-4 text-3xl font-bold text-gray-900">お問い合わせ</h1>
            <p className="text-gray-600">
              当サイト「らこふる」へのお問い合わせはフォームから、掲載農園へのお問い合わせは各農園ページからお願いします。
            </p>
          </div>

          <div className="rounded-lg border border-blue-100 bg-blue-50 p-6">
            <h2 className="mb-2 text-lg font-bold text-blue-900">掲載農園へのお問い合わせ</h2>
            <p className="mb-4 text-sm text-blue-800">
              営業時間・予約状況・料金などの詳細は、各農園ページの「電話で問い合わせ」または「公式サイト」からご連絡ください。
            </p>
            <Button variant="outline" className="w-full bg-white hover:bg-blue-50" asChild>
              <a href="/">農園を探す</a>
            </Button>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-bold text-gray-900">当サイト「らこふる」へのお問い合わせ</h2>
            <p className="mb-6 text-sm text-muted-foreground">
              掲載依頼、取材のご相談、不具合のご報告などは以下のフォームよりお送りください。
            </p>

            <form className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-bold">お名前</label>
                  <input type="text" className="w-full rounded border p-2" placeholder="山田 太郎" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold">メールアドレス</label>
                  <input type="email" className="w-full rounded border p-2" placeholder="info@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">お問い合わせ内容</label>
                <textarea className="h-32 w-full rounded border p-2" placeholder="ご用件をご記入ください" />
              </div>
              <Button type="submit" className="w-full py-6 text-lg font-bold">
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
