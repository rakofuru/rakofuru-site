module.exports = [
"[project]/data/farms.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v([{"id":"farm-0001","slug":"midoriyama-blueberry","categorySlug":"chiba","title":"みどり山ブルーベリー園","excerpt":"森に囲まれた丘の上で味わう、摘みたてブルーベリー。","bodyHtml":"<p>千葉県北部の丘陵地にあるブルーベリー農園です。完熟した実だけを摘めるよう、畑ごとに品種を分けて管理しています。</p><p>開園期間は6月中旬から8月上旬まで。園内には簡易の休憩スペースがあります。</p>","heroImage":{"id":"media-0101","srcUrl":"https://rakofuru.com/wp-content/uploads/2024/06/midoriyama-hero.jpg","alt":"みどり山ブルーベリー園の入口","title":"みどり山ブルーベリー園","width":1600,"height":900,"legacy":{"wpAttachmentId":501}},"images":[{"id":"media-0102","srcUrl":"https://rakofuru.com/wp-content/uploads/2024/06/midoriyama-field.jpg","alt":"ブルーベリー畑","title":"畑の様子","width":1200,"height":800,"legacy":{"wpAttachmentId":502}},{"id":"media-0103","srcUrl":"https://rakofuru.com/wp-content/uploads/2024/06/midoriyama-shop.jpg","alt":"直売所の様子","title":"直売所","width":1200,"height":800,"legacy":{"wpAttachmentId":503}}],"location":{"googleMapsPlaceUrl":"https://www.google.com/maps/place/?q=place_id:ChIJmidoriyama0001","googleMapsReviewsUrl":"https://www.google.com/maps/place/?q=place_id:ChIJmidoriyama0001#lrd=0x0:0x0,1,,,,","addressText":"千葉県○○市緑山1-2-3","phone":"047-000-0001","officialUrl":"https://midoriyama.example.com"},"attribution":{"source":"Google Maps","sourceUrl":"https://www.google.com/maps/place/?q=place_id:ChIJmidoriyama0001"},"publishedAt":"2024-06-10T09:00:00+09:00","updatedAt":"2024-07-01T10:30:00+09:00","status":"published","legacy":{"wpPostId":101,"wpPermalink":"https://rakofuru.com/chiba/midoriyama-blueberry/"}},{"id":"farm-0002","slug":"sakura-berry-farm","categorySlug":"chiba","title":"さくらベリーファーム","excerpt":"駅から近い家族向けのブルーベリー摘み取り園。","bodyHtml":"<p>駅から徒歩圏内のアクセスしやすい農園です。品種は早生から晩生まで揃い、時期によって違う味わいを楽しめます。</p><p>売店ではジャムやスムージーの販売も行っています。</p>","images":[{"id":"media-0201","srcUrl":"https://rakofuru.com/wp-content/uploads/2024/06/sakura-hero.jpg","alt":"さくらベリーファームの看板","title":"さくらベリーファーム","width":1600,"height":900,"legacy":{"wpAttachmentId":601}},{"id":"media-0202","srcUrl":"https://rakofuru.com/wp-content/uploads/2024/06/sakura-picking.jpg","alt":"摘み取り体験","title":"摘み取り体験","width":1200,"height":800,"legacy":{"wpAttachmentId":602}}],"location":{"googleMapsPlaceUrl":"https://www.google.com/maps/place/?q=place_id:ChIJsakuraberry0002","googleMapsReviewsUrl":"https://www.google.com/maps/place/?q=place_id:ChIJsakuraberry0002#lrd=0x0:0x0,1,,,,","addressText":"千葉県○○市桜町4-5-6","phone":"047-000-0002","officialUrl":"https://sakuraberry.example.com"},"attribution":{"source":"Google Maps","sourceUrl":"https://www.google.com/maps/place/?q=place_id:ChIJsakuraberry0002"},"publishedAt":"2024-06-15T09:00:00+09:00","updatedAt":"2024-07-05T09:15:00+09:00","status":"published","legacy":{"wpPostId":102,"wpPermalink":"https://rakofuru.com/chiba/sakura-berry-farm/"}}]);}),
"[project]/data/site.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"name":"らこふる","tagline":"千葉県のブルーベリー農園さがしは「らこふる」で","description":"千葉県内のブルーベリー農園を探せる、農園ごとの魅力と最新情報をまとめた情報サイト。","locale":"ja","timezone":"Asia/Tokyo","canonicalDomain":"https://rakofuru.com","seo":{"titleTemplate":"%s | らこふる","defaultTitle":"らこふる","defaultDescription":"千葉県内のブルーベリー農園を探せる、農園ごとの魅力と最新情報をまとめた情報サイト。","robots":"index,follow","ogImageUrl":"https://rakofuru.com/og/default.jpg"}});}),
"[project]/data/legacy-comments.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v([{"id":"comment-0001","farmSlug":"midoriyama-blueberry","authorName":"田中美咲","authorRole":"user","contentHtml":"<p>家族で伺いました。木陰が多く、暑い日でも過ごしやすかったです。</p>","createdAt":"2024-07-12T14:20:00+09:00","legacy":{"wpCommentId":201}},{"id":"comment-0002","farmSlug":"midoriyama-blueberry","parentId":"comment-0001","authorName":"みどり山ブルーベリー園","authorRole":"owner","contentHtml":"<p>ご来園ありがとうございました。次回は晩生の品種もぜひお試しください。</p>","createdAt":"2024-07-13T09:05:00+09:00","legacy":{"wpCommentId":202}}]);}),
"[project]/lib/data.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "farms",
    ()=>farms,
    "legacyComments",
    ()=>legacyComments,
    "site",
    ()=>site
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$farms$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/data/farms.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$site$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/data/site.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$legacy$2d$comments$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/data/legacy-comments.json (json)");
;
;
;
const farms = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$farms$2e$json__$28$json$29$__["default"];
const site = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$site$2e$json__$28$json$29$__["default"];
const legacyComments = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$legacy$2d$comments$2e$json__$28$json$29$__["default"];
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RootLayout,
    "metadata",
    ()=>metadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/data.ts [app-rsc] (ecmascript)");
;
;
const metadata = {
    metadataBase: new URL(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["site"].canonicalDomain),
    title: {
        default: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["site"].seo.defaultTitle,
        template: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["site"].seo.titleTemplate
    },
    description: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["site"].seo.defaultDescription,
    robots: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["site"].seo.robots,
    openGraph: {
        type: "website",
        title: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["site"].seo.defaultTitle,
        description: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["site"].seo.defaultDescription,
        url: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["site"].canonicalDomain,
        siteName: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["site"].name,
        images: [
            {
                url: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["site"].seo.ogImageUrl
            }
        ],
        locale: "ja_JP"
    }
};
function RootLayout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
        lang: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["site"].locale,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
            children: children
        }, void 0, false, {
            fileName: "[project]/app/layout.tsx",
            lineNumber: 30,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/layout.tsx",
        lineNumber: 29,
        columnNumber: 5
    }, this);
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-rsc] (ecmascript)").vendored['react-rsc'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
];

//# sourceMappingURL=_5570823d._.js.map