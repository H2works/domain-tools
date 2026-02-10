"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2 } from "lucide-react"

export default function DnsLookupPage() {
  const [domain, setDomain] = useState("")
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setResults(null)
    setError(null)

    if (!domain || typeof domain !== "string") {
      setError("無効なドメインが提供されました")
      setLoading(false)
      return
    }

    const domainRegex = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!domainRegex.test(domain)) {
      setError("無効なドメイン形式です。example.com のような形式を使用してください")
      setLoading(false)
      return
    }

    try {
      // 各レコードタイプごとにリクエスト
      const [aRes, mxRes, txtRes, cnameRes] = await Promise.all([
        fetch(`https://dns.google/resolve?name=${domain}&type=A`).then(r => r.json()),
        fetch(`https://dns.google/resolve?name=${domain}&type=MX`).then(r => r.json()),
        fetch(`https://dns.google/resolve?name=${domain}&type=TXT`).then(r => r.json()),
        fetch(`https://dns.google/resolve?name=${domain}&type=CNAME`).then(r => r.json()),
      ])

      const aRecords =
        aRes.Answer?.filter((record) => record.type === 1)
          .map((record) => ({ value: record.data })) || []

      const mxRecords =
        mxRes.Answer?.filter((record) => record.type === 15)
          .map((record) => ({
            value: record.data.split(" ")[1],
            priority: Number.parseInt(record.data.split(" ")[0]),
          })) || []

      const txtRecords =
        txtRes.Answer?.filter((record) => record.type === 16)
          .map((record) => ({ value: record.data.replace(/"/g, "") })) || []

      const cnameRecords =
        cnameRes.Answer?.filter((record) => record.type === 5)
          .map((record) => ({ value: record.data })) || []

      setResults({
        aRecords,
        mxRecords,
        txtRecords,
        cnameRecords,
      })
    } catch (err) {
      console.error("DNS lookup error:", err)
      setError(err.message || "予期せぬエラーが発生しました")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">DNSルックアップ</CardTitle>
        <CardDescription>ドメイン名を入力して、A、MX、TXT、CNAMEレコードを表示します。</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          <div className="mt-8 space-y-8">
            <div>
              <h3 className="mb-4 text-xl font-semibold">Aレコード</h3>
              {results.aRecords.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>IPアドレス</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.aRecords.map((record, index) => (
                      <TableRow key={`a-${index}`}>
                        <TableCell>{record.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-muted-foreground">Aレコードは見つかりませんでした。</p>
              )}
            </div>

            <div>
              <h3 className="mb-4 text-xl font-semibold">MXレコード</h3>
              {results.mxRecords.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>優先度</TableHead>
                      <TableHead>ホスト</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.mxRecords.map((record, index) => (
                      <TableRow key={`mx-${index}`}>
                        <TableCell>{record.priority}</TableCell>
                        <TableCell>{record.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-muted-foreground">MXレコードは見つかりませんでした。</p>
              )}
            </div>

            <div>
              <h3 className="mb-4 text-xl font-semibold">TXTレコード</h3>
              {results.txtRecords.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>テキスト</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.txtRecords.map((record, index) => (
                      <TableRow key={`txt-${index}`}>
                        <TableCell className="break-all">{record.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-muted-foreground">TXTレコードは見つかりませんでした。</p>
              )}
            </div>

            <div>
              <h3 className="mb-4 text-xl font-semibold">CNAMEレコード</h3>
              {results.cnameRecords.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>エイリアス元</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {results.cnameRecords.map((record, index) => (
                      <TableRow key={`cname-${index}`}>
                        <TableCell>{record.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-muted-foreground">CNAMEレコードは見つかりませんでした。</p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
