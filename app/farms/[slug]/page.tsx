import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Farm, LegacyComment } from "../../../lib/types";
import { farms, legacyComments, site } from "../../../lib/data";

export const dynamicParams = false;

type CommentThread = {
  parent: LegacyComment;
  replies: LegacyComment[];
};

const getFarmBySlug = (slug: string): Farm | undefined => {
  return farms.find((farm) => farm.slug === slug);
};

const getCommentsForFarm = (farmSlug: string): CommentThread[] => {
  const farmComments = legacyComments.filter(
    (comment) => comment.farmSlug === farmSlug,
  );
  const repliesByParent = new Map<string, LegacyComment[]>();
  const parents: LegacyComment[] = [];

  for (const comment of farmComments) {
    if (comment.parentId) {
      const bucket = repliesByParent.get(comment.parentId) ?? [];
      bucket.push(comment);
      repliesByParent.set(comment.parentId, bucket);
    } else {
      parents.push(comment);
    }
  }

  return parents.map((parent) => ({
    parent,
    replies: repliesByParent.get(parent.id) ?? [],
  }));
};

const buildFarmCanonicalUrl = (farm: Farm): string => {
  if (farm.legacy.wpPermalink) {
    return farm.legacy.wpPermalink;
  }

  return `${site.canonicalDomain}/farms/${farm.slug}`;
};

const pickFarmOgImage = (farm: Farm): string => {
  if (farm.heroImage?.srcUrl) {
    return farm.heroImage.srcUrl;
  }
  if (farm.images[0]?.srcUrl) {
    return farm.images[0].srcUrl;
  }
  return site.seo.ogImageUrl;
};

export const generateStaticParams = () => {
  return farms.map((farm) => ({ slug: farm.slug }));
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> => {
  const { slug } = await params;
  const farm = getFarmBySlug(slug);

  if (!farm) {
    return {
      title: site.seo.defaultTitle,
      description: site.seo.defaultDescription,
      robots: "noindex,nofollow",
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
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      title,
      description,
      url: canonicalUrl,
      siteName: site.name,
      images: [{ url: ogImageUrl }],
      locale: "ja_JP",
    },
  };
};

export default async function FarmDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const farm = getFarmBySlug(slug);

  if (!farm) {
    notFound();
  }

  const commentThreads = getCommentsForFarm(farm.slug);

  return (
    <main>
      <header>
        <p>カテゴリ: {farm.categorySlug}</p>
        <h1>{farm.title}</h1>
        {farm.excerpt ? <p>{farm.excerpt}</p> : null}
      </header>

      {farm.heroImage ? (
        <section>
          <figure>
            <img
              src={farm.heroImage.srcUrl}
              alt={farm.heroImage.alt ?? farm.title}
              width={farm.heroImage.width}
              height={farm.heroImage.height}
            />
            {farm.heroImage.title ? (
              <figcaption>{farm.heroImage.title}</figcaption>
            ) : null}
          </figure>
        </section>
      ) : null}

      <section>
        <h2>農園紹介</h2>
        <div dangerouslySetInnerHTML={{ __html: farm.bodyHtml }} />
      </section>

      <section>
        <h2>写真</h2>
        <ul>
          {farm.images.map((image) => (
            <li key={image.id}>
              <figure>
                <img
                  src={image.srcUrl}
                  alt={image.alt ?? farm.title}
                  width={image.width}
                  height={image.height}
                />
                {(image.title ?? image.alt) ? (
                  <figcaption>{image.title ?? image.alt}</figcaption>
                ) : null}
              </figure>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>アクセス</h2>
        {farm.location.addressText ? <p>{farm.location.addressText}</p> : null}
        {farm.location.phone ? <p>{farm.location.phone}</p> : null}
        <ul>
          <li>
            <a href={farm.location.googleMapsPlaceUrl} rel="noopener noreferrer">
              Googleマップ（場所）
            </a>
          </li>
          {farm.location.googleMapsReviewsUrl ? (
            <li>
              <a
                href={farm.location.googleMapsReviewsUrl}
                rel="noopener noreferrer"
              >
                Googleマップ（口コミ）
              </a>
            </li>
          ) : null}
          {farm.location.officialUrl ? (
            <li>
              <a href={farm.location.officialUrl} rel="noopener noreferrer">
                公式サイト
              </a>
            </li>
          ) : null}
        </ul>
        <p>
          出典: {farm.attribution.source}
          {farm.attribution.sourceUrl ? (
            <>
              {" "}
              <a href={farm.attribution.sourceUrl} rel="noopener noreferrer">
                {farm.attribution.sourceUrl}
              </a>
            </>
          ) : null}
        </p>
      </section>

      <section>
        <h2>コメント</h2>
        {commentThreads.length === 0 ? (
          <p>コメントはまだありません。</p>
        ) : (
          <ul>
            {commentThreads.map((thread) => (
              <li key={thread.parent.id}>
                <article>
                  <header>
                    <p>{thread.parent.authorName}</p>
                    {thread.parent.authorRole ? (
                      <p>role: {thread.parent.authorRole}</p>
                    ) : null}
                    <p>{thread.parent.createdAt}</p>
                  </header>
                  <div
                    dangerouslySetInnerHTML={{ __html: thread.parent.contentHtml }}
                  />
                </article>

                {thread.replies.length > 0 ? (
                  <ul>
                    {thread.replies.map((reply) => (
                      <li key={reply.id}>
                        <article>
                          <header>
                            <p>{reply.authorName}</p>
                            {reply.authorRole ? (
                              <p>role: {reply.authorRole}</p>
                            ) : null}
                            <p>{reply.createdAt}</p>
                          </header>
                          <div
                            dangerouslySetInnerHTML={{
                              __html: reply.contentHtml,
                            }}
                          />
                        </article>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2>コメントを投稿</h2>
        <p>投稿機能は準備中です。</p>
        <form>
          <label htmlFor="comment-name">お名前</label>
          <input id="comment-name" name="authorName" type="text" />

          <label htmlFor="comment-content">コメント</label>
          <textarea id="comment-content" name="content" rows={5} />

          <div>
            <p>reCAPTCHA（準備中）</p>
          </div>

          <button type="button" disabled>
            送信（準備中）
          </button>
        </form>
      </section>
    </main>
  );
}
