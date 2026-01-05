module.exports = [
"[project]/data/site.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"name":"らこふる","tagline":"千葉県のブルーベリー農園さがしは「らこふる」で","description":"千葉県内のブルーベリー農園を探せる、農園ごとの魅力と最新情報をまとめた情報サイト。","locale":"ja","timezone":"Asia/Tokyo","canonicalDomain":"https://rakofuru.com","seo":{"titleTemplate":"%s | らこふる","defaultTitle":"らこふる","defaultDescription":"千葉県内のブルーベリー農園を探せる、農園ごとの魅力と最新情報をまとめた情報サイト。","robots":"index,follow","ogImageUrl":"https://rakofuru.com/og/default.jpg"}});}),
"[project]/app/layout.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RootLayout,
    "metadata",
    ()=>metadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$site$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/data/site.json (json)");
;
;
const site = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$site$2e$json__$28$json$29$__["default"];
const metadata = {
    metadataBase: new URL(site.canonicalDomain),
    title: {
        default: site.seo.defaultTitle,
        template: site.seo.titleTemplate
    },
    description: site.seo.defaultDescription,
    robots: site.seo.robots,
    openGraph: {
        type: "website",
        title: site.seo.defaultTitle,
        description: site.seo.defaultDescription,
        url: site.canonicalDomain,
        siteName: site.name,
        images: [
            {
                url: site.seo.ogImageUrl
            }
        ],
        locale: "ja_JP"
    }
};
function RootLayout({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("html", {
        lang: site.locale,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("body", {
            children: children
        }, void 0, false, {
            fileName: "[project]/app/layout.tsx",
            lineNumber: 33,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/layout.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-rsc] (ecmascript)").vendored['react-rsc'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
];

//# sourceMappingURL=_4681640a._.js.map