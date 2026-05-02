export const metadata = {
  title: "WHOISルックアップツール",
  description: "ドメインの登録者、レジストラ、登録日、有効期限、ネームサーバーなどのWHOIS情報を即時に照会できます。ドメイン所有状況の確認や調査、登録情報の検証に便利な無料ツールです。",
  keywords: ["WHOISルックアップ", "ドメイン登録", "ドメイン情報", "レジストラ情報"],
  openGraph: {
    title: "WHOISルックアップツール | ドメインツール",
    description: "ドメイン登録情報を即時に照会し、所有者や有効期限、ネームサーバーなどの詳細を確認できる無料ツールです。",
    url: "https://domain-tools.h2works.xyz/whois"
  }
}

export default function WhoisLayout({ children }) {
  return children
}
