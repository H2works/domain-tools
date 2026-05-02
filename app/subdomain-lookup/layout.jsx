export const metadata = {
  title: "サブドメイン検索ツール",
  description: "公開されているサブドメインを検出してドメインの攻撃面や管理資産を把握できます。入力したドメインのサブドメインを一覧化し、調査やセキュリティ分析に活用できる無料ツールです。",
  keywords: ["サブドメイン検索", "サブドメインファインダー", "サブドメイン発見", "DNS列挙"],
  openGraph: {
    title: "サブドメイン検索ツール | ドメインツール",
    description: "公開サブドメインを検索して、ドメインの攻撃対象や管理資産を把握できる無料ツールです。セキュリティ分析やドメイン資産管理に便利です。",
    url: "https://domain-tools.h2works.xyz/subdomain-lookup"
  }
}

export default function SubdomainLookupLayout({ children }) {
  return children
}
