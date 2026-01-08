import fs from "fs"
import path from "path"
import * as cheerio from "cheerio"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const FARMS_JSON_PATH = path.join(__dirname, "../data/farms.json")
const VIEW_JSON_PATH = path.join(__dirname, "../data/farms.view.json")

const BLUEBERRY_PLACEHOLDERS = Array.from({ length: 36 }, (_, index) => {
  const id = String(index + 1).padStart(2, "0")
  return `/images/blueberry/blueberry-${id}.svg`
})

const ACCESS_KEY = "アクセス"
const PARKING_KEY = "駐車場"
const HOURS_KEY = "営業時間"
const PRICE_KEY = "料金"
const NOTES_KEY = "備考"

const getStableImageForSlug = (slug) => {
  if (!slug) return "/images/default-farm.png"
  const hash = slug.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return BLUEBERRY_PLACEHOLDERS[hash % BLUEBERRY_PLACEHOLDERS.length]
}

function buildViewJson() {
  console.log("Building farms.view.json...")

  if (!fs.existsSync(FARMS_JSON_PATH)) {
    console.error("Error: data/farms.json not found.")
    process.exit(1)
  }

  const rawData = fs.readFileSync(FARMS_JSON_PATH, "utf8")
  let farms = []
  try {
    farms = JSON.parse(rawData)
  } catch (e) {
    console.error("Error parsing farms.json:", e)
    process.exit(1)
  }

  const farmViews = farms.map((farm) => {
    const view = {
      id: farm.id,
      slug: farm.slug,
      categorySlug: farm.categorySlug,
      title: farm.title,
      heroImage: {
        id: farm.id,
        srcUrl: getStableImageForSlug(farm.slug),
        alt: null,
        title: null,
        width: 800,
        height: 600,
      },
      location: farm.location,
      publishedAt: farm.publishedAt,
      updatedAt: farm.updatedAt,
      infoTable: {},
      pricingBrief: "",
      parkingBrief: "",
      hoursBrief: "",
      priceValue: 0,
      hasTakeout: false,
      seasonBrief: "",
      seasonMonths: [],
      sections: [],
      reviewWidgetId: null,
      googleMapsEmbed: null,
      features: [],
    }

    if (!farm.bodyHtml) {
      return view
    }

    const $ = cheerio.load(farm.bodyHtml)

    const $table = $("table").first()
    const infoTable = {}
    const features = []

    let pricingBrief = ""
    let parkingBrief = ""
    let hoursBrief = ""
    let priceValue = 0
    let hasTakeout = false
    let seasonBrief = ""

    if ($table.length) {
      $table.find("tr").each((_, tr) => {
        const $tds = $(tr).find("td")
        if ($tds.length < 2) return

        const key = $tds.eq(0).text().trim()
        const valueHtml = $tds.eq(1).html()?.trim() || ""
        const valueText = $tds.eq(1).text().trim()

        if (!key) return
        infoTable[key] = valueHtml

        if (key.includes(PARKING_KEY) && valueText) {
          if (valueText.includes("あり") || valueText.includes("台")) {
            features.push("駐車場あり")
          }
          const firstLine = valueText.split(/\n|<br\s*\/?>/i)[0]
          parkingBrief = firstLine.replace("あり｜無料", "無料").trim()
        }

        if (key.includes(PRICE_KEY) && valueText) {
          if (valueText.includes("食べ放題")) {
            features.push("食べ放題")
          }
          const firstLine = valueText.split(/\n|<br\s*\/?>/i)[0]
          pricingBrief = firstLine
            .replace("中学生以上：", "")
            .replace("大人：", "")
            .replace("大人", "")
            .trim()
          const priceMatch = valueText.match(/(\d{3,5})/)
          if (priceMatch) {
            priceValue = Number.parseInt(priceMatch[1], 10)
          }
        }

        if (key.includes(NOTES_KEY) && valueText) {
          if (valueText.includes("予約") || valueText.includes("要予約")) {
            features.push("要予約")
          }
          if (valueText.includes("持ち帰り") || valueText.includes("量り売り")) {
            features.push("持ち帰り可")
            hasTakeout = true
          }
          if (valueText.includes("雨天") || valueText.includes("屋根") || valueText.includes("ハウス")) {
            features.push("雨天OK")
          }
        }

        if (key.includes(HOURS_KEY) && valueText) {
          hoursBrief = valueText.split(/\n|<br\s*\/?>/i)[0]
          const seasonLine = valueText
            .split(/\n|<br\s*\/?>/i)
            .find((line) => line.includes("月"))?.trim()
          if (seasonLine) {
            seasonBrief = seasonLine
              .replace(/上旬|中旬|下旬/g, "")
              .replace(/予定|※/g, "")
              .replace(/[()（）]/g, "")
              .trim()
          }
        }
      })
      $table.remove()
    }

    const seasonMonths = []
    if (seasonBrief) {
      const rangeMatch = seasonBrief.match(/(\d{1,2})月.*?(\d{1,2})月/)
      if (rangeMatch) {
        const start = Number.parseInt(rangeMatch[1], 10)
        const end = Number.parseInt(rangeMatch[2], 10)
        if (!Number.isNaN(start) && !Number.isNaN(end)) {
          for (let month = start; month <= end; month += 1) {
            seasonMonths.push(month)
          }
        }
      } else {
        if (seasonBrief.includes("6月")) seasonMonths.push(6)
        if (seasonBrief.includes("7月")) seasonMonths.push(7)
        if (seasonBrief.includes("8月")) seasonMonths.push(8)
        if (seasonBrief.includes("9月")) seasonMonths.push(9)
      }
    }

    $("h2").each((_, h2) => {
      const $h2 = $(h2)
      const title = $h2.text().trim()
      let contentHtml = ""
      let $next = $h2.next()

      while ($next.length && $next.prop("tagName") !== "H2") {
        contentHtml += $.html($next)
        $next = $next.next()
      }

      const reviewMatch = contentHtml.match(/\[grw\s+id=["'](\d+)["']\]/)
      if (reviewMatch) {
        view.reviewWidgetId = reviewMatch[1]
      }

      if (title.includes(ACCESS_KEY)) {
        const iframeSrc =
          $h2.parent().parent().find("iframe").attr("src") ||
          $next.find("iframe").attr("src")
        if (iframeSrc && iframeSrc.includes("google.com/maps/embed")) {
          view.googleMapsEmbed = iframeSrc
        }
        contentHtml = contentHtml
          .replace(/駐車場.*?台/g, "")
          .replace(/駐車場.*?あり/g, "")
          .replace(/<br\s*\/?>\s*$/g, "")
      }

      view.sections.push({
        title,
        contentHtml: contentHtml.trim(),
      })
    })

    view.infoTable = infoTable
    view.features = features
    view.pricingBrief = pricingBrief
    view.parkingBrief = parkingBrief
    view.hoursBrief = hoursBrief
    view.priceValue = priceValue
    view.hasTakeout = hasTakeout
    view.seasonBrief = seasonBrief
    view.seasonMonths = seasonMonths

    return view
  })

  fs.writeFileSync(VIEW_JSON_PATH, JSON.stringify(farmViews, null, 2))
  console.log(`Successfully generated farms.view.json with ${farmViews.length} farms.`)
}

buildViewJson()
