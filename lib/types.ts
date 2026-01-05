/* =========================================================
 * Canonical Types for rakofuru
 * このファイルは「憲法」。
 * UI・API・変換スクリプトは必ずこれに従うこと。
 * ========================================================= */

/* --------------------
 * 共通ユーティリティ
 * ------------------ */

export type ISODateString = string; // 例: "2026-01-05T14:10:44+09:00"

export type Locale = "ja";

/* --------------------
 * サイト全体メタ
 * ------------------ */

export interface SiteMeta {
  name: string;                // らこふる
  tagline: string;             // 千葉県のブルーベリー農園さがしは「らこふる」で
  description: string;         // サイト説明文
  locale: Locale;              // ja
  timezone: "Asia/Tokyo";
  canonicalDomain: string;     // https://rakofuru.com

  seo: {
    titleTemplate: string;     // "%s | らこふる"
    defaultTitle: string;
    defaultDescription: string;
    robots: "index,follow" | "noindex,nofollow";
    ogImageUrl: string;        // デフォルトOG画像
  };
}

/* --------------------
 * 農園（最重要）
 * ------------------ */

export interface Farm {
  /** 安定ID（将来DB化しても不変） */
  id: string;

  /** URL生成に使う（WP postname） */
  slug: string;

  /** WP category 相当（URL互換のため必須） */
  categorySlug: string;

  /** 表示用 */
  title: string;
  excerpt?: string;

  /**
   * WordPress本文を改変せず保持
   * HTMLそのまま
   */
  bodyHtml: string;

  /** ヒーロー画像 */
  heroImage?: MediaRef;

  /** 本文・ギャラリー含む画像 */
  images: MediaRef[];

  /** 位置・外部リンク */
  location: {
    googleMapsPlaceUrl: string;     // 地図ページ直リンク
    googleMapsReviewsUrl?: string;  // 口コミ直リンク
    addressText?: string;
    phone?: string;
    officialUrl?: string;
  };

  /** 出典表記 */
  attribution: {
    source: "Google Maps" | "公式サイト" | "その他";
    sourceUrl?: string;
  };

  /** 公開情報 */
  publishedAt: ISODateString;
  updatedAt?: ISODateString;
  status: "published" | "draft";

  /** WordPress互換情報（将来トラブル防止用） */
  legacy: {
    wpPostId: number;
    wpPermalink?: string;
  };
}

/* --------------------
 * 固定ページ
 * ------------------ */

export interface StaticPage {
  id: string;
  slug: string;
  title: string;
  bodyHtml: string;
  publishedAt: ISODateString;
  updatedAt?: ISODateString;

  legacy: {
    wpPostId: number;
  };
}

/* --------------------
 * メディア
 * ------------------ */

export interface MediaRef {
  id: string;
  srcUrl: string;     // uploads のURLをそのまま使う
  alt?: string;
  title?: string;
  width?: number;
  height?: number;

  legacy: {
    wpAttachmentId: number;
  };
}

/* --------------------
 * 既存コメント（凍結・編集不可）
 * ------------------ */

export interface LegacyComment {
  /** コメントID（安定） */
  id: string;

  /** 紐づく農園 slug */
  farmSlug: string;

  /** 返信構造（親コメントID） */
  parentId?: string;

  /** 表示名（改変禁止） */
  authorName: string;

  /** 管理者・オーナー等（なければ null） */
  authorRole?: "admin" | "owner" | "user" | null;

  /** HTMLそのまま */
  contentHtml: string;

  /** 投稿日時（正確に） */
  createdAt: ISODateString;

  legacy: {
    wpCommentId: number;
  };
}

/* --------------------
 * 将来拡張用（今は未実装）
 * ------------------ */

export interface NewCommentDraft {
  farmSlug: string;
  authorName: string;
  content: string;
  captchaToken: string;
}

export interface InquiryDraft {
  name: string;
  email: string;
  message: string;
  captchaToken: string;
}

/* --------------------
 * コレクション型
 * ------------------ */

export type FarmList = Farm[];
export type LegacyCommentList = LegacyComment[];
export type StaticPageList = StaticPage[];
