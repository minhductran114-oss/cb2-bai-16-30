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
    description: "PWA học tiếng Trung CB2 với pilot Bài 23–25: học sâu, nối kiến thức cũ, luyện dùng thật và ôn tích lũy.",
    manifest: "/manifest.webmanifest",
    icons: { icon: "/icon-192.png", apple: "/icon-192.png" },
    openGraph: {
      title: "Học tiếng Trung CB2 · Pilot Bài 23–25",
      description: "Học sâu · Nối bài · Dùng thật trong một web app có thể cài đặt và học offline.",
      images: [{ url: "/og-pilot-23-25.png", width: 1734, height: 907, alt: "Học tiếng Trung CB2 - Pilot Bài 23 đến 25" }],
      type: "website",
    },
    twitter: { card: "summary_large_image", images: ["/og-pilot-23-25.png"] },
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
