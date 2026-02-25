"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="flex h-full items-center justify-center bg-gray-100 p-4 dark:bg-gray-950">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">ドメインツールへようこそ</CardTitle>
          <CardDescription>開始するツールを選択してください。</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Link href="/dns-lookup" passHref className="block">
            <Button className="w-full">DNSルックアップ</Button>
          </Link>
          <Link href="/subdomain-lookup" passHref className="block">
            <Button className="w-full">サブドメイン検索</Button>
          </Link>
          <Link href="/cli-tools" passHref className="block">
            <Button className="w-full">CURLコンバーター</Button>
          </Link>
          <Link href="/password-tools" passHref className="block">
            <Button className="w-full">パスワード生成ツール</Button>
          </Link>
          <Link href="/whois" passHref className="block">
            <Button className="w-full">WHOISルックアップ</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
