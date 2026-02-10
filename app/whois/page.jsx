"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

export default function WhoisLookupPage() {
  const [domain, setDomain] = useState("")
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleLookup = async (e) => {
    e.preventDefault()
    setLoading(true)
    setResults(null)
    setError(null)

    // ドメイン簡易バリデーション
    const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!domain || !domainRegex.test(domain)) {
      setError("無効なドメイン形式です。example.com のような形式を使用してください")
      setLoading(false)
      return
    }

    try {
      const endpoint = `api/whois?domain=${encodeURIComponent(domain)}`

      const response = await fetch(endpoint)
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `HTTPエラー! ステータス: ${response.status}`)
      }
      const data = await response.json()
      setResults(data)
    } catch (err) {
      console.error("WHOIS lookup error:", err)
      setError(err.message || "WHOISルックアップ中に予期せぬエラーが発生しました。")
    } finally {
      setLoading(false)
    }
  }

  const renderWhoisData = (data) => {
    if (!data.WhoisRecord) return <p>WHOISデータが見つかりませんでした。</p>
    const record = data.WhoisRecord
    const rawText = record.registryData?.rawText || record.registryData?.rawtext
    return (
      <>
        {rawText ? (
          <pre className="overflow-auto rounded-md bg-gray-800 p-4 text-sm text-green-400">
            {rawText}
          </pre>
        ) : (
          <pre className="overflow-auto rounded-md bg-gray-800 p-4 text-sm text-green-400">
            {JSON.stringify(record, null, 2)}
          </pre>
        )}
      </>
    )
  }

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">WHOISルックアップ</CardTitle>
        <CardDescription>WHOIS情報を取得するためにドメイン名を入力してください。</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLookup} className="flex flex-col gap-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="domain">ドメイン名</Label>
            <Input
              id="domain"
              type="text"
              placeholder="example.com"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              required
            />
          </div>
          <Button type="submit" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}検索
          </Button>
        </form>

        {error && (
          <div className="mt-6 rounded-md bg-red-100 p-4 text-red-700 dark:bg-red-900 dark:text-red-200">
            <p className="font-medium">エラー:</p>
            <p>{error}</p>
          </div>
        )}

        {results && (
          <div className="mt-8">
            <h3 className="mb-4 text-xl font-semibold">{domain} のWHOIS結果</h3>
            {renderWhoisData(results)}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
