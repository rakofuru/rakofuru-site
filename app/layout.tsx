import type { Metadata } from "next";
import { site } from "../lib/data";

export const metadata: Metadata = {
  metadataBase: new URL(site.canonicalDomain),
  title: {
    default: site.seo.defaultTitle,
    template: site.seo.titleTemplate,
  },
  description: site.seo.defaultDescription,
  robots: site.seo.robots,
  openGraph: {
    type: "website",
    title: site.seo.defaultTitle,
    description: site.seo.defaultDescription,
    url: site.canonicalDomain,
    siteName: site.name,
    images: [{ url: site.seo.ogImageUrl }],
    locale: "ja_JP",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={site.locale}>
      <body>{children}</body>
    </html>
  );
}
