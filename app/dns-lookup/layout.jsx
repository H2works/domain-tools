export const metadata = {
  title: "DNSルックアップツール",
  description: "無料のDNSルックアップツール。任意のドメインのDNSレコード（A、MX、TXT、CNAME）を照会します。ネットワーク診断のための即時DNS情報を取得します。",
  keywords: ["DNSルックアップ", "DNSレコード", "Aレコード", "MXレコード", "TXTレコード", "CNAMEレコード"],
  openGraph: {
    title: "DNSルックアップツール | ドメインツール",
    description: "無料のDNSルックアップツール。任意のドメインのDNSレコードを即座に照会します。",
    url: "https://domain-tools.h2works.xyz/dns-lookup"
  }
}

export default function DnsLookupLayout({ children }) {
  return children
}
