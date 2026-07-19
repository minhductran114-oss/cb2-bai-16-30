import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") || requestHeaders.get("host") || "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") || (host.startsWith("localhost") ? "http" : "https");
  const base = new URL(`${protocol}://${host}`);
  return {
    metadataBase: base,
    title: "CB2 · Lộ trình Bài 16–30 | Tài liệu học tiếng Trung",
    description: "PWA học tiếng Trung CB2 theo lộ trình Bài 16–30, có kho kiến thức, ôn tích lũy, checkpoint và sổ lỗi sai.",
    manifest: "/manifest.webmanifest",
    icons: { icon: "/icon-192.png", apple: "/icon-192.png" },
    openGraph: {
      title: "CB2 · Lộ trình Bài 16–30",
      description: "Học theo một lộ trình liên tục với kho kiến thức, ôn tích lũy và sổ lỗi sai.",
      images: [{ url: "/og.png", width: 1734, height: 907, alt: "Tài liệu học tiếng Trung CB2 Bài 16–30" }],
      type: "website",
    },
    twitter: { card: "summary_large_image", images: ["/og.png"] },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f2eee5",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body>{children}</body></html>;
}
