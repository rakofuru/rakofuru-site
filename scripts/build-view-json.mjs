
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
      heroImage: farm.heroImage,
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

    if ($table.length) {
      $table.find('tr').each((_, tr) => {
        const $tds = $(tr).find('td');
        if ($tds.length >= 2) {
          const key = $tds.eq(0).text().trim();
          const valueHtml = $tds.eq(1).html()?.trim() || '';
          const valueText = $tds.eq(1).text().trim();

          if (key && valueText) {
            infoTable[key] = valueHtml;

            // Feature Tag Extraction
            if (key.includes('駐車場') && (valueText.includes('あり') || valueText.includes('台'))) {
              features.push('駐車場あり');
              parkingBrief = valueText.split(/<br\s*\/?>/i)[0].replace('あり｜', ''); // Simple brief
            }
            if (key.includes('料金')) {
              if (valueText.includes('食べ放題')) features.push('食べ放題');
              // Extract first line or simplified price for brief
              const firstLine = valueText.split(/\n|<br\s*\/?>/i)[0];
              pricingBrief = firstLine.replace('中学生以上：', '').replace('大人', '');
            }
            if (key.includes('備考') && (valueText.includes('予約'))) {
              features.push('要予約');
            }
            if (key.includes('営業時間')) {
              hoursBrief = valueText.split(/<br\s*\/?>/i)[0]; // First line only
            }
          }
        }
      });
      // Remove the table from DOM so it doesn't appear in sections
      $table.remove();
    }

    view.infoTable = infoTable;
    view.features = features;
    view.pricingBrief = pricingBrief;
    view.parkingBrief = parkingBrief;
    view.hoursBrief = hoursBrief;

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
