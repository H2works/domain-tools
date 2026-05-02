export const metadata = {
  title: "DNSルックアップツール",
  description: "任意のドメインのDNSレコードを高速に照会し、A、AAAA、MX、TXT、CNAMEなどのレコードを簡単に確認できます。ネットワーク診断やドメイン解析に最適な無料ツールです。",
  keywords: ["DNSルックアップ", "DNSレコード", "Aレコード", "MXレコード", "TXTレコード", "CNAMEレコード"],
  openGraph: {
    title: "DNSルックアップツール | ドメインツール",
    description: "任意のドメインのDNSレコードを高速に照会し、A/AAAA/MX/TXT/CNAMEなどの詳細を即時に確認できる無料ツールです。",
    url: "https://domain-tools.h2works.xyz/dns-lookup"
  }
}

export default function DnsLookupLayout({ children }) {
  return children
}
