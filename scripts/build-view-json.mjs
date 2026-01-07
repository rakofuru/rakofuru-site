
import fs from 'fs';
import path from 'path';
import * as cheerio from 'cheerio';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FARMS_JSON_PATH = path.join(__dirname, '../data/farms.json');
const VIEW_JSON_PATH = path.join(__dirname, '../data/farms.view.json');

function buildViewJson() {
  console.log('Building farms.view.json...');

  if (!fs.existsSync(FARMS_JSON_PATH)) {
    console.error('Error: data/farms.json not found.');
    process.exit(1);
  }

  const rawData = fs.readFileSync(FARMS_JSON_PATH, 'utf8');
  let farms = [];
  try {
    farms = JSON.parse(rawData);
  } catch (e) {
    console.error('Error parsing farms.json:', e);
    process.exit(1);
  }

  const farmViews = farms.map(farm => {
    // 1. Basic Info Copy
    const view = {
      id: farm.id,
      slug: farm.slug,
      categorySlug: farm.categorySlug, // Will be mapped to area-master in UI
      title: farm.title,
      heroImage: {
        srcUrl: "/images/default-farm.png",
        width: 800,
        height: 600,
        original: farm.heroImage // Keep legacy ref if needed
      },
      location: farm.location,
      publishedAt: farm.publishedAt,
      updatedAt: farm.updatedAt,
      // Structured Data Containers
      infoTable: {}, // Extracted from the first table
      sections: [], // Extracted from H2 sections
      reviewWidgetId: null, // Extracted from [grw id="..."]
      googleMapsEmbed: null, // Extracted iframe src
      // Metadata tags (for filtering)
      features: [],
    };

    if (!farm.bodyHtml) {
      return view;
    }

    const $ = cheerio.load(farm.bodyHtml);

    // 2. Extract Info Table
    // Assumption: The first table in the content is the "Basic Info" table.
    const $table = $('table').first();
    const infoTable = {};
    const features = [];

    // Brief fields for Card UI
    let pricingBrief = "";
    let parkingBrief = "";
    let hoursBrief = "";

    // New fields for Phase 5 filter
    let priceValue = 0; // For sorting
    let hasTakeout = false;
    let seasonBrief = "";

    if ($table.length) {
      $table.find('tr').each((_, tr) => {
        const $tds = $(tr).find('td');
        if ($tds.length >= 2) {
          const key = $tds.eq(0).text().trim();
          const valueHtml = $tds.eq(1).html()?.trim() || '';
          const valueText = $tds.eq(1).text().trim();

          if (key && valueText) {
            // Clean up values before saving
            // Remove "Details Here" links found in Parking and Access
            if (key.includes('駐車場') || key.includes('アクセス')) {
              const clean = valueHtml
                .replace(/<br\s*\/?>\s*<a[^>]*>■詳細はコチラ<\/a>/gi, '')
                .replace(/<a[^>]*>■詳細はコチラ<\/a>/gi, '');
              infoTable[key] = clean;
            } else {
              infoTable[key] = valueHtml;
            }

            // Feature Tag Extraction & Phase 5 Data
            if (key.includes('駐車場') && (valueText.includes('あり') || valueText.includes('台'))) {
              features.push('駐車場あり');
              parkingBrief = valueText.split(/<br\s*\/?>/i)[0]
                .replace('あり｜', '')
                .replace('■詳細はコチラ', '')
                .trim();
            }
            if (key.includes('料金')) {
              if (valueText.includes('食べ放題')) features.push('食べ放題');

              // Extract first line or simplified price for brief
              const firstLine = valueText.split(/\n|<br\s*\/?>/i)[0];
              pricingBrief = firstLine.replace('中学生以上：', '').replace('大人', '');

              // Normalize price for sorting (find first number)
              const priceMatch = valueText.match(/(\d{3,5})/);
              if (priceMatch) {
                priceValue = parseInt(priceMatch[1], 10);
              }
            }
            if (key.includes('備考')) {
              if (valueText.includes('予約')) features.push('要予約');
              if (valueText.includes('持ち帰り') || valueText.includes('量り売り')) {
                features.push('持ち帰り可');
                hasTakeout = true;
              }
            }
            if (key.includes('営業時間')) {
              hoursBrief = valueText.split(/<br\s*\/?>/i)[0];

              // Try to extract season
              // Format often: "6月~9中旬" or similar
              const seasonMatch = valueText.match(/(\d{1,2})月/);
              if (seasonMatch) {
                const rawLine = valueText.split(/\n|<br\s*\/?>/i).find(l => l.includes('月')) || "";
                // Remove "Early/Late" (上旬/中旬/下旬) and "Planned" (予定) for cleaner UI
                seasonBrief = rawLine
                  .replace(/上旬|中旬|下旬/g, '')
                  .replace(/予定/g, '')
                  .replace(/[()（）]/g, '')
                  .trim();
              }
            }
          }
        }
      });
      // Remove the table from DOM so it doesn't appear in sections
      $table.remove();
    }

    // Randomize Thumbnail if default
    // We have farm-0.png, farm-1.png, farm-2.png
    // Simple hash based on ID to be deterministic
    const farmIdNum = parseInt(farm.id) || 0;
    const thumbIndex = farmIdNum % 3;
    let thumbSrc = `/images/farm-${thumbIndex}.png`;

    // Force Override Logic
    // User requested "Replace WP Image URLs with local placeholder logic if original WP image is missing/broken (or force override as per request)."
    // And "Thumbnails: Randomize assignment (No people)".
    // So we force use local randomized images.

    view.heroImage = {
      srcUrl: thumbSrc,
      width: 800,
      height: 600
    };

    view.features = features;
    view.pricingBrief = pricingBrief;
    view.parkingBrief = parkingBrief;

    // Phase 5 fields
    view.priceValue = priceValue;
    view.hasTakeout = hasTakeout;
    view.seasonBrief = seasonBrief;

    // Season Range Logic
    // Parse "6月〜8月" or "6月下旬〜8月" to [6, 7, 8]
    const seasonMonths = [];
    if (seasonBrief) {
      const rangeMatch = seasonBrief.match(/(\d{1,2})月.*?〜.*?(\d{1,2})月/);
      if (rangeMatch) {
        const start = parseInt(rangeMatch[1], 10);
        const end = parseInt(rangeMatch[2], 10);
        if (!isNaN(start) && !isNaN(end)) {
          for (let m = start; m <= end; m++) {
            seasonMonths.push(m);
          }
        }
      } else {
        // Single month check or simple list
        if (seasonBrief.includes('6月')) seasonMonths.push(6);
        if (seasonBrief.includes('7月')) seasonMonths.push(7);
        if (seasonBrief.includes('8月')) seasonMonths.push(8);
      }
    }
    view.seasonMonths = seasonMonths;

    // 3. Extract Sections (H2 based)
    // We iterate through all top-level elements to group them into sections.
    // However, the WP HTML structure might be flat. 
    // Strategy: Find H2s. Everything after an H2 until the next H2 is that section's content.

    // First, let's treat the Table as "handled" content.
    // We want to extract "Access", "Parking" (if separate), "Reviews".

    $('h2').each((_, h2) => {
      const $h2 = $(h2);
      const title = $h2.text().trim();
      let contentHtml = '';

      let $next = $h2.next();
      while ($next.length && $next.prop('tagName') !== 'H2') {
        // Special handling: Review Widget Shortcode
        // WP shortcodes might appear as text or inside a div depending on how raw content is saved.
        // In the provided JSON, it looks like: [grw id="372"] inside a wp-block-cover or similar?
        // Actually, let's check the HTML string for the entire section.
        contentHtml += $.html($next);
        $next = $next.next();
      }

      // 4. Extract Review Widget ID
      const grwMatch = contentHtml.match(/\[grw\s+id=["'](\d+)["']\]/);
      if (grwMatch) {
        view.reviewWidgetId = grwMatch[1];
        // We might want to NOT include this in 'sections' list if we want a dedicated UI component for it.
        // But for safe fallback, we can keep it, or strip it. 
        // Let's strip the shortcode from the HTML content if we plan to render it manually.
        // For now, let's keep it in sections but flag it.
      }

      // 5. Extract Google Maps Embed
      if (title.includes('アクセス')) {
        const iframeSrc = $h2.parent().parent().find('iframe').attr('src') || $next.find('iframe').attr('src'); // Try finding nearby
        if (iframeSrc && iframeSrc.includes('google.com/maps/embed')) {
          view.googleMapsEmbed = iframeSrc;
        }
      }

      view.sections.push({
        title: title,
        contentHtml: contentHtml.trim()
      });
    });

    // 6. Fallback: If no info table found, maybe we should treat the whole body as "content"?
    // But for this task, the goal is structured data. 

    return view;
  });

  fs.writeFileSync(VIEW_JSON_PATH, JSON.stringify(farmViews, null, 2));
  console.log(`Successfully generated farms.view.json with ${farmViews.length} farms.`);
}

buildViewJson();
