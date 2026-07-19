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
    title: "CB2 · Bài 23–24 | Tiếng Trung Mộc Mộc",
    description: "PWA tương tác học Giáo trình Hán ngữ quyển 2: bài 23 và 24.",
    manifest: "/manifest.webmanifest",
    icons: { icon: "/icon-192.png", apple: "/icon-192.png" },
    openGraph: {
      title: "CB2 · Bài 23–24",
      description: "Học để dùng được: hội thoại, bản đồ, ngữ pháp, luyện tập và viết chữ.",
      images: [{ url: "/og.png", width: 1794, height: 947, alt: "CB2 bài 23–24: Học để dùng được" }],
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
