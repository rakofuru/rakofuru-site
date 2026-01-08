import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { createClient } from "@supabase/supabase-js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const FARMS_JSON_PATH = path.join(__dirname, "../data/farms.json")
const FARMS_VIEW_PATH = path.join(__dirname, "../data/farms.view.json")

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.")
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
})

const farms = JSON.parse(fs.readFileSync(FARMS_JSON_PATH, "utf8"))
const farmsView = JSON.parse(fs.readFileSync(FARMS_VIEW_PATH, "utf8"))
const viewMap = new Map(farmsView.map((farm) => [farm.id, farm]))

const farmRows = farms.map((farm) => {
  const view = viewMap.get(farm.id)
  return {
    id: farm.id,
    slug: farm.slug,
    title: farm.title,
    body_html: farm.bodyHtml,
    excerpt: farm.excerpt ?? null,
    category_slug: farm.categorySlug,
    hero_image_url: farm.heroImage?.srcUrl ?? null,
    thumbnail_url: null,
    address_text: farm.location?.addressText ?? null,
    phone: farm.location?.phone ?? null,
    official_url: farm.location?.officialUrl ?? null,
    google_maps_place_url: farm.location?.googleMapsPlaceUrl ?? null,
    google_maps_reviews_url: farm.location?.googleMapsReviewsUrl ?? null,
    parking_text: view?.infoTable?.["駐車場"] ?? null,
    price_text: view?.infoTable?.["料金"] ?? null,
    hours_text: view?.infoTable?.["営業時間"] ?? null,
    access_text: view?.infoTable?.["アクセス"] ?? null,
    is_public: true,
    updated_at: farm.updatedAt ?? farm.publishedAt,
  }
})

const { error: farmError } = await supabase.from("farms_admin").upsert(farmRows, { onConflict: "id" })
if (farmError) {
  console.error("Failed to seed farms_admin:", farmError)
  process.exit(1)
}

const yachimataSlug = "yachimata-blueberry"

const rootComments = [
  {
    id: "b9c3ed7b-5b7b-4e05-9f4b-3c2f9c1a8f01",
    farm_slug: yachimataSlug,
    author_name: "ムッシュ",
    body:
      "昨日　行きました。\nここのおじさんは腕の良い庭師です。\nしかもバイクも乗ります。私もバイクで行った\nので園の中をたっぷり案内していただきました。\n樹木の疑問には何でも答えてくれます。\n楽しい時間でした。若い社長も優しいです。\nベリーの時期にはかみさんといきます。",
    created_at: "2025-04-11T16:54:26+09:00",
    parent_id: null,
    is_public: true,
  },
  {
    id: "f0b6959c-1e24-4fcb-9b0b-9b2f6d8df201",
    farm_slug: yachimataSlug,
    author_name: "Mia (Area 52)",
    body: "Nice share!",
    created_at: "2025-06-03T21:27:55+09:00",
    parent_id: null,
    is_public: true,
  },
  {
    id: "1aa3cf71-8d41-4477-9a4a-7b8e5cd15b03",
    farm_slug: yachimataSlug,
    author_name: "あっこ",
    body:
      "昨日、孫（4歳）２人、娘２人と一緒に行きました。\nスタッフの方がとても親切で、いろいろ教えてくださり、それぞれの種類の味を比べながら味わい、たくさん摘んできました。美味しかったてす。\n手作りのブランコやハンモックに乗ったり、烏骨鶏をみたり、孫も楽しんでいました。\nまた行きます。ありがとうございました。",
    created_at: "2025-07-14T13:05:11+09:00",
    parent_id: null,
    is_public: true,
  },
]

const replyComments = [
  {
    id: "5b1f0ae3-4b2c-4b8f-9d53-02c1c0a7e2b2",
    farm_slug: yachimataSlug,
    author_name: "八街ブルーベリーファーム 春夫観光農園",
    body:
      "ムッシュ、ありがとうございます。ソーラーパネルの下ですので、日影が多いので、涼しくブルー狩りができます。入場料も１２００円、お土産、約３００gが付きます。９月いっぱいやっていますので、どうぞ御来園ください。",
    created_at: "2025-08-14T21:01:08+09:00",
    parent_id: "b9c3ed7b-5b7b-4e05-9f4b-3c2f9c1a8f01",
    is_public: true,
  },
  {
    id: "7ed5e0ff-5be0-4df1-9f6b-4c4d92f4bd02",
    farm_slug: yachimataSlug,
    author_name: "八街ブルーベリーファーム 春夫観光農園",
    body: "せんきゅー",
    created_at: "2025-08-14T21:02:08+09:00",
    parent_id: "f0b6959c-1e24-4fcb-9b0b-9b2f6d8df201",
    is_public: true,
  },
  {
    id: "c0a26ac7-1c5d-4b79-9b5f-2cfe6d1c7c04",
    farm_slug: yachimataSlug,
    author_name: "八街ブルーベリーファーム 春夫観光農園",
    body:
      "ありがとうございました。子供用のプールもあります。今度は着替えを持ってきて、プールで楽しんでください。お待ちしております。",
    created_at: "2025-08-14T21:04:33+09:00",
    parent_id: "1aa3cf71-8d41-4477-9a4a-7b8e5cd15b03",
    is_public: true,
  },
]

const { error: commentError } = await supabase.from("comments").upsert(rootComments, { onConflict: "id" })
if (commentError) {
  console.error("Failed to seed root comments:", commentError)
  process.exit(1)
}

const { error: replyError } = await supabase.from("comments").upsert(replyComments, { onConflict: "id" })
if (replyError) {
  console.error("Failed to seed reply comments:", replyError)
  process.exit(1)
}

console.log("Seed completed.")
