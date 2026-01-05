module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/app/not-found.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/not-found.tsx [app-rsc] (ecmascript)"));
}),
"[project]/data/farms.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v([{"id":"farm-0001","slug":"midoriyama-blueberry","categorySlug":"chiba","title":"みどり山ブルーベリー園","excerpt":"森に囲まれた丘の上で味わう、摘みたてブルーベリー。","bodyHtml":"<p>千葉県北部の丘陵地にあるブルーベリー農園です。完熟した実だけを摘めるよう、畑ごとに品種を分けて管理しています。</p><p>開園期間は6月中旬から8月上旬まで。園内には簡易の休憩スペースがあります。</p>","heroImage":{"id":"media-0101","srcUrl":"https://rakofuru.com/wp-content/uploads/2024/06/midoriyama-hero.jpg","alt":"みどり山ブルーベリー園の入口","title":"みどり山ブルーベリー園","width":1600,"height":900,"legacy":{"wpAttachmentId":501}},"images":[{"id":"media-0102","srcUrl":"https://rakofuru.com/wp-content/uploads/2024/06/midoriyama-field.jpg","alt":"ブルーベリー畑","title":"畑の様子","width":1200,"height":800,"legacy":{"wpAttachmentId":502}},{"id":"media-0103","srcUrl":"https://rakofuru.com/wp-content/uploads/2024/06/midoriyama-shop.jpg","alt":"直売所の様子","title":"直売所","width":1200,"height":800,"legacy":{"wpAttachmentId":503}}],"location":{"googleMapsPlaceUrl":"https://www.google.com/maps/place/?q=place_id:ChIJmidoriyama0001","googleMapsReviewsUrl":"https://www.google.com/maps/place/?q=place_id:ChIJmidoriyama0001#lrd=0x0:0x0,1,,,,","addressText":"千葉県○○市緑山1-2-3","phone":"047-000-0001","officialUrl":"https://midoriyama.example.com"},"attribution":{"source":"Google Maps","sourceUrl":"https://www.google.com/maps/place/?q=place_id:ChIJmidoriyama0001"},"publishedAt":"2024-06-10T09:00:00+09:00","updatedAt":"2024-07-01T10:30:00+09:00","status":"published","legacy":{"wpPostId":101,"wpPermalink":"https://rakofuru.com/chiba/midoriyama-blueberry/"}},{"id":"farm-0002","slug":"sakura-berry-farm","categorySlug":"chiba","title":"さくらベリーファーム","excerpt":"駅から近い家族向けのブルーベリー摘み取り園。","bodyHtml":"<p>駅から徒歩圏内のアクセスしやすい農園です。品種は早生から晩生まで揃い、時期によって違う味わいを楽しめます。</p><p>売店ではジャムやスムージーの販売も行っています。</p>","images":[{"id":"media-0201","srcUrl":"https://rakofuru.com/wp-content/uploads/2024/06/sakura-hero.jpg","alt":"さくらベリーファームの看板","title":"さくらベリーファーム","width":1600,"height":900,"legacy":{"wpAttachmentId":601}},{"id":"media-0202","srcUrl":"https://rakofuru.com/wp-content/uploads/2024/06/sakura-picking.jpg","alt":"摘み取り体験","title":"摘み取り体験","width":1200,"height":800,"legacy":{"wpAttachmentId":602}}],"location":{"googleMapsPlaceUrl":"https://www.google.com/maps/place/?q=place_id:ChIJsakuraberry0002","googleMapsReviewsUrl":"https://www.google.com/maps/place/?q=place_id:ChIJsakuraberry0002#lrd=0x0:0x0,1,,,,","addressText":"千葉県○○市桜町4-5-6","phone":"047-000-0002","officialUrl":"https://sakuraberry.example.com"},"attribution":{"source":"Google Maps","sourceUrl":"https://www.google.com/maps/place/?q=place_id:ChIJsakuraberry0002"},"publishedAt":"2024-06-15T09:00:00+09:00","updatedAt":"2024-07-05T09:15:00+09:00","status":"published","legacy":{"wpPostId":102,"wpPermalink":"https://rakofuru.com/chiba/sakura-berry-farm/"}}]);}),
"[project]/data/legacy-comments.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v([{"id":"comment-0001","farmSlug":"midoriyama-blueberry","authorName":"田中美咲","authorRole":"user","contentHtml":"<p>家族で伺いました。木陰が多く、暑い日でも過ごしやすかったです。</p>","createdAt":"2024-07-12T14:20:00+09:00","legacy":{"wpCommentId":201}},{"id":"comment-0002","farmSlug":"midoriyama-blueberry","parentId":"comment-0001","authorName":"みどり山ブルーベリー園","authorRole":"owner","contentHtml":"<p>ご来園ありがとうございました。次回は晩生の品種もぜひお試しください。</p>","createdAt":"2024-07-13T09:05:00+09:00","legacy":{"wpCommentId":202}}]);}),
"[project]/app/farms/[slug]/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FarmDetailPage,
    "dynamicParams",
    ()=>dynamicParams,
    "generateMetadata",
    ()=>generateMetadata,
    "generateStaticParams",
    ()=>generateStaticParams
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$farms$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/data/farms.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$legacy$2d$comments$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/data/legacy-comments.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$site$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/data/site.json (json)");
;
;
;
;
;
const farms = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$farms$2e$json__$28$json$29$__["default"];
const legacyComments = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$legacy$2d$comments$2e$json__$28$json$29$__["default"];
const site = __TURBOPACK__imported__module__$5b$project$5d2f$data$2f$site$2e$json__$28$json$29$__["default"];
const dynamicParams = false;
const getFarmBySlug = (slug)=>{
    return farms.find((farm)=>farm.slug === slug);
};
const getCommentsForFarm = (farmSlug)=>{
    const farmComments = legacyComments.filter((comment)=>comment.farmSlug === farmSlug);
    const repliesByParent = new Map();
    const parents = [];
    for (const comment of farmComments){
        if (comment.parentId) {
            const bucket = repliesByParent.get(comment.parentId) ?? [];
            bucket.push(comment);
            repliesByParent.set(comment.parentId, bucket);
        } else {
            parents.push(comment);
        }
    }
    return parents.map((parent)=>({
            parent,
            replies: repliesByParent.get(parent.id) ?? []
        }));
};
const buildFarmCanonicalUrl = (farm)=>{
    if (farm.legacy.wpPermalink) {
        return farm.legacy.wpPermalink;
    }
    return `${site.canonicalDomain}/farms/${farm.slug}`;
};
const pickFarmOgImage = (farm)=>{
    if (farm.heroImage?.srcUrl) {
        return farm.heroImage.srcUrl;
    }
    if (farm.images[0]?.srcUrl) {
        return farm.images[0].srcUrl;
    }
    return site.seo.ogImageUrl;
};
const generateStaticParams = ()=>{
    return farms.map((farm)=>({
            slug: farm.slug
        }));
};
const generateMetadata = ({ params })=>{
    const farm = getFarmBySlug(params.slug);
    if (!farm) {
        return {
            title: site.seo.defaultTitle,
            description: site.seo.defaultDescription,
            robots: "noindex,nofollow"
        };
    }
    const title = farm.title;
    const description = farm.excerpt ?? site.seo.defaultDescription;
    const canonicalUrl = buildFarmCanonicalUrl(farm);
    const ogImageUrl = pickFarmOgImage(farm);
    return {
        title,
        description,
        alternates: {
            canonical: canonicalUrl
        },
        openGraph: {
            type: "article",
            title,
            description,
            url: canonicalUrl,
            siteName: site.name,
            images: [
                {
                    url: ogImageUrl
                }
            ],
            locale: "ja_JP"
        }
    };
};
function FarmDetailPage({ params }) {
    const farm = getFarmBySlug(params.slug);
    if (!farm) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["notFound"])();
    }
    const commentThreads = getCommentsForFarm(farm.slug);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            "カテゴリ: ",
                            farm.categorySlug
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/farms/[slug]/page.tsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        children: farm.title
                    }, void 0, false, {
                        fileName: "[project]/app/farms/[slug]/page.tsx",
                        lineNumber: 129,
                        columnNumber: 9
                    }, this),
                    farm.excerpt ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: farm.excerpt
                    }, void 0, false, {
                        fileName: "[project]/app/farms/[slug]/page.tsx",
                        lineNumber: 130,
                        columnNumber: 25
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/app/farms/[slug]/page.tsx",
                lineNumber: 127,
                columnNumber: 7
            }, this),
            farm.heroImage ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("figure", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: farm.heroImage.srcUrl,
                            alt: farm.heroImage.alt ?? farm.title,
                            width: farm.heroImage.width,
                            height: farm.heroImage.height
                        }, void 0, false, {
                            fileName: "[project]/app/farms/[slug]/page.tsx",
                            lineNumber: 136,
                            columnNumber: 13
                        }, this),
                        farm.heroImage.title ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("figcaption", {
                            children: farm.heroImage.title
                        }, void 0, false, {
                            fileName: "[project]/app/farms/[slug]/page.tsx",
                            lineNumber: 143,
                            columnNumber: 15
                        }, this) : null
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/farms/[slug]/page.tsx",
                    lineNumber: 135,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/farms/[slug]/page.tsx",
                lineNumber: 134,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "農園紹介"
                    }, void 0, false, {
                        fileName: "[project]/app/farms/[slug]/page.tsx",
                        lineNumber: 150,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        dangerouslySetInnerHTML: {
                            __html: farm.bodyHtml
                        }
                    }, void 0, false, {
                        fileName: "[project]/app/farms/[slug]/page.tsx",
                        lineNumber: 151,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/farms/[slug]/page.tsx",
                lineNumber: 149,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "写真"
                    }, void 0, false, {
                        fileName: "[project]/app/farms/[slug]/page.tsx",
                        lineNumber: 155,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        children: farm.images.map((image)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("figure", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: image.srcUrl,
                                            alt: image.alt ?? farm.title,
                                            width: image.width,
                                            height: image.height
                                        }, void 0, false, {
                                            fileName: "[project]/app/farms/[slug]/page.tsx",
                                            lineNumber: 160,
                                            columnNumber: 17
                                        }, this),
                                        image.title ?? image.alt ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("figcaption", {
                                            children: image.title ?? image.alt
                                        }, void 0, false, {
                                            fileName: "[project]/app/farms/[slug]/page.tsx",
                                            lineNumber: 167,
                                            columnNumber: 19
                                        }, this) : null
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/farms/[slug]/page.tsx",
                                    lineNumber: 159,
                                    columnNumber: 15
                                }, this)
                            }, image.id, false, {
                                fileName: "[project]/app/farms/[slug]/page.tsx",
                                lineNumber: 158,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/farms/[slug]/page.tsx",
                        lineNumber: 156,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/farms/[slug]/page.tsx",
                lineNumber: 154,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "アクセス"
                    }, void 0, false, {
                        fileName: "[project]/app/farms/[slug]/page.tsx",
                        lineNumber: 176,
                        columnNumber: 9
                    }, this),
                    farm.location.addressText ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: farm.location.addressText
                    }, void 0, false, {
                        fileName: "[project]/app/farms/[slug]/page.tsx",
                        lineNumber: 177,
                        columnNumber: 38
                    }, this) : null,
                    farm.location.phone ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: farm.location.phone
                    }, void 0, false, {
                        fileName: "[project]/app/farms/[slug]/page.tsx",
                        lineNumber: 178,
                        columnNumber: 32
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: farm.location.googleMapsPlaceUrl,
                                    rel: "noopener noreferrer",
                                    children: "Googleマップ（場所）"
                                }, void 0, false, {
                                    fileName: "[project]/app/farms/[slug]/page.tsx",
                                    lineNumber: 181,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/farms/[slug]/page.tsx",
                                lineNumber: 180,
                                columnNumber: 11
                            }, this),
                            farm.location.googleMapsReviewsUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: farm.location.googleMapsReviewsUrl,
                                    rel: "noopener noreferrer",
                                    children: "Googleマップ（口コミ）"
                                }, void 0, false, {
                                    fileName: "[project]/app/farms/[slug]/page.tsx",
                                    lineNumber: 187,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/farms/[slug]/page.tsx",
                                lineNumber: 186,
                                columnNumber: 13
                            }, this) : null,
                            farm.location.officialUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: farm.location.officialUrl,
                                    rel: "noopener noreferrer",
                                    children: "公式サイト"
                                }, void 0, false, {
                                    fileName: "[project]/app/farms/[slug]/page.tsx",
                                    lineNumber: 197,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/farms/[slug]/page.tsx",
                                lineNumber: 196,
                                columnNumber: 13
                            }, this) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/farms/[slug]/page.tsx",
                        lineNumber: 179,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            "出典: ",
                            farm.attribution.source,
                            farm.attribution.sourceUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: farm.attribution.sourceUrl,
                                        rel: "noopener noreferrer",
                                        children: farm.attribution.sourceUrl
                                    }, void 0, false, {
                                        fileName: "[project]/app/farms/[slug]/page.tsx",
                                        lineNumber: 208,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true) : null
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/farms/[slug]/page.tsx",
                        lineNumber: 203,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/farms/[slug]/page.tsx",
                lineNumber: 175,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "コメント"
                    }, void 0, false, {
                        fileName: "[project]/app/farms/[slug]/page.tsx",
                        lineNumber: 217,
                        columnNumber: 9
                    }, this),
                    commentThreads.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "コメントはまだありません。"
                    }, void 0, false, {
                        fileName: "[project]/app/farms/[slug]/page.tsx",
                        lineNumber: 219,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                        children: commentThreads.map((thread)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: thread.parent.authorName
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/farms/[slug]/page.tsx",
                                                        lineNumber: 226,
                                                        columnNumber: 21
                                                    }, this),
                                                    thread.parent.authorRole ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: [
                                                            "role: ",
                                                            thread.parent.authorRole
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/farms/[slug]/page.tsx",
                                                        lineNumber: 228,
                                                        columnNumber: 23
                                                    }, this) : null,
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: thread.parent.createdAt
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/farms/[slug]/page.tsx",
                                                        lineNumber: 230,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/farms/[slug]/page.tsx",
                                                lineNumber: 225,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                dangerouslySetInnerHTML: {
                                                    __html: thread.parent.contentHtml
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/app/farms/[slug]/page.tsx",
                                                lineNumber: 232,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/farms/[slug]/page.tsx",
                                        lineNumber: 224,
                                        columnNumber: 17
                                    }, this),
                                    thread.replies.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        children: thread.replies.map((reply)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    children: reply.authorName
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/farms/[slug]/page.tsx",
                                                                    lineNumber: 243,
                                                                    columnNumber: 29
                                                                }, this),
                                                                reply.authorRole ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    children: [
                                                                        "role: ",
                                                                        reply.authorRole
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/app/farms/[slug]/page.tsx",
                                                                    lineNumber: 245,
                                                                    columnNumber: 31
                                                                }, this) : null,
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    children: reply.createdAt
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/farms/[slug]/page.tsx",
                                                                    lineNumber: 247,
                                                                    columnNumber: 29
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/farms/[slug]/page.tsx",
                                                            lineNumber: 242,
                                                            columnNumber: 27
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            dangerouslySetInnerHTML: {
                                                                __html: reply.contentHtml
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/farms/[slug]/page.tsx",
                                                            lineNumber: 249,
                                                            columnNumber: 27
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/farms/[slug]/page.tsx",
                                                    lineNumber: 241,
                                                    columnNumber: 25
                                                }, this)
                                            }, reply.id, false, {
                                                fileName: "[project]/app/farms/[slug]/page.tsx",
                                                lineNumber: 240,
                                                columnNumber: 23
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/farms/[slug]/page.tsx",
                                        lineNumber: 238,
                                        columnNumber: 19
                                    }, this) : null
                                ]
                            }, thread.parent.id, true, {
                                fileName: "[project]/app/farms/[slug]/page.tsx",
                                lineNumber: 223,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/app/farms/[slug]/page.tsx",
                        lineNumber: 221,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/farms/[slug]/page.tsx",
                lineNumber: 216,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "コメントを投稿"
                    }, void 0, false, {
                        fileName: "[project]/app/farms/[slug]/page.tsx",
                        lineNumber: 266,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "投稿機能は準備中です。"
                    }, void 0, false, {
                        fileName: "[project]/app/farms/[slug]/page.tsx",
                        lineNumber: 267,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "comment-name",
                                children: "お名前"
                            }, void 0, false, {
                                fileName: "[project]/app/farms/[slug]/page.tsx",
                                lineNumber: 269,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                id: "comment-name",
                                name: "authorName",
                                type: "text"
                            }, void 0, false, {
                                fileName: "[project]/app/farms/[slug]/page.tsx",
                                lineNumber: 270,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "comment-content",
                                children: "コメント"
                            }, void 0, false, {
                                fileName: "[project]/app/farms/[slug]/page.tsx",
                                lineNumber: 272,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                id: "comment-content",
                                name: "content",
                                rows: 5
                            }, void 0, false, {
                                fileName: "[project]/app/farms/[slug]/page.tsx",
                                lineNumber: 273,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "reCAPTCHA（準備中）"
                                }, void 0, false, {
                                    fileName: "[project]/app/farms/[slug]/page.tsx",
                                    lineNumber: 276,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/farms/[slug]/page.tsx",
                                lineNumber: 275,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                disabled: true,
                                children: "送信（準備中）"
                            }, void 0, false, {
                                fileName: "[project]/app/farms/[slug]/page.tsx",
                                lineNumber: 279,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/farms/[slug]/page.tsx",
                        lineNumber: 268,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/farms/[slug]/page.tsx",
                lineNumber: 265,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/farms/[slug]/page.tsx",
        lineNumber: 126,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/farms/[slug]/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/app/farms/[slug]/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__33555e01._.js.map