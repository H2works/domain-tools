"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { NetworkIcon as Dns, Globe, Terminal, Home, Repeat, Key, Search, Info } from "lucide-react"

export function Sidebar({ onLinkClick }) {
  // onLinkClickプロパティを追加
  const pathname = usePathname()

  const navItems = [
    {
      name: "ホーム",
      href: "/",
      icon: Home,
    },
    {
      name: "DNSルックアップ",
      href: "/dns-lookup",
      icon: Dns,
    },
    {
      name: "サブドメイン検索",
      href: "/subdomain-lookup",
      icon: Globe,
    },
    {
      name: "cURL変換",
      href: "/curl-converter",
      icon: Repeat,
    },
    {
      name: "パスワード生成ツール",
      href: "/password-tools",
      icon: Key,
    },
    {
      name: "WHOISルックアップ",
      href: "/whois",
      icon: Info,
    },
  ]

  return (
    <aside className="flex w-64 flex-col border-r bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-8 flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-gray-50">
        <Search className="h-6 w-6" />
        ドメインツール
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50",
              )}
              onClick={onLinkClick} // リンククリック時にonLinkClickを呼び出す
            >
              <Icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>
      <div className="mt-auto pt-4 border-t text-xs text-gray-500 dark:text-gray-400">
        <span>関連サイト</span>
        <div className="mt-1 flex flex-col space-y-1">
          <a
            href="https://news-archive.h2works.xyz/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            News Archive
          </a>
          <a
            href="https://template-library.h2works.xyz/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Template Library
          </a>
        </div>
      </div>
    </aside>
  )
}
