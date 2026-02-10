import "./globals.css"
import ClientLayout from "./client"

export const metadata = {
  metadataBase: new URL("https://domain-tools.h2works.xyz"),
  title: {
    default: "ドメインツール - DNS & サブドメイン検索",
    template: "%s | ドメインツール"
  },
  description: "DNSルックアップ、サブドメイン発見、WHOIS情報など、ドメイン分析のための無料オンラインツールです。開発者やネットワーク管理者向けのプロフェッショナルなドメインツール。",
  keywords: ["DNSルックアップ", "サブドメイン検索", "WHOIS検索", "ドメインツール", "DNSレコード", "ネットワークツール"],
  authors: [
    {
      name: "Domain Tools",
      url: "https://domain-tools.h2works.xyz"
    }
  ],
  creator: "Domain Tools",
  publisher: "Domain Tools",
  
  // Open Graph
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://domain-tools.h2works.xyz",
    siteName: "Domain Tools",
    title: "ドメインツール - DNS & サブドメイン検索",
    description: "DNSルックアップ、サブドメイン発見、WHOIS情報など、ドメイン分析のための無料オンラインツール。",
    images: [
      {
        url: "/placeholder-logo.svg",
        width: 1200,
        height: 630,
        alt: "Domain Tools"
      }
    ]
  },
  
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "ドメインツール - DNS & サブドメイン検索",
    description: "DNSルックアップ、サブドメイン発見、WHOIS情報など、ドメイン分析のための無料オンラインツール。",
    images: ["/placeholder-logo.svg"]
  },
  
  // Icons
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        url: "/placeholder-logo.svg",
        type: "image/svg+xml"
      }
    ]
  },
  
  // Manifest for PWA
  manifest: "/manifest.json",
  
  // Viewport for mobile optimization
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  
  colorScheme: "light dark",
  
  // Additional
  robots: {
    index: true,
    follow: true,
    nocache: false,
    "google-site-verification": undefined
  },
  
  category: "Technology",
  alternates: {
    canonical: "https://domain-tools.h2works.xyz"
  },
  
  verification: {
    // Google Search Console verification code can be added here
  },
  
  generator: "Next.js"
}

export default function RootLayout({ children }) {
  return <ClientLayout>{children}</ClientLayout>
}
