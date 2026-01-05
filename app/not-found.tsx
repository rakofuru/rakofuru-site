import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main>
      <h1>ページが見つかりません</h1>
      <p>お探しのページは移動または削除された可能性があります。</p>
      <Link href="/">トップへ戻る</Link>
    </main>
  );
}
