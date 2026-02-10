"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Loader2 } from "lucide-react"

export default function SubdomainLookupPage() {
  const [domain, setDomain] = useState("")
  const [subdomains, setSubdomains] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSubdomains(null)
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
      const crtShResponse = await fetch(`https://crt.sh/?q=%25.${domain}&output=json`)
      if (!crtShResponse.ok) {
        throw new Error(`crt.sh からサブドメインのフェッチに失敗しました: ${crtShResponse.statusText}`)
      }
      const crtShData = await crtShResponse.json()

      const uniqueSubdomains = new Set()
      crtShData.forEach((cert) => {
        if (cert.common_name && cert.common_name.endsWith(`.${domain}`)) {
          uniqueSubdomains.add(cert.common_name)
        }
        if (cert.name_value) {
          cert.name_value.split("\n").forEach((name) => {
            if (name.startsWith("*.") && name.length > 2) {
              name = name.substring(2) // Remove *. prefix
            }
            if (name.endsWith(`.${domain}`) && name !== domain) {
              uniqueSubdomains.add(name)
            }
          })
        }
      })

      setSubdomains(Array.from(uniqueSubdomains).sort())
    } catch (err) {
      console.error("Subdomain lookup error:", err)
      setError(err.message || "予期せぬエラーが発生しました")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">サブドメイン検索</CardTitle>
        <CardDescription>ネイキッドドメインをもとに、サブドメインを見つけます。</CardDescription>
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

        {subdomains && (
          <div className="mt-8">
            <h3 className="mb-4 text-xl font-semibold">サブドメイン (crt.sh より)</h3>
            {subdomains.length > 0 ? (
              <Table>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>サブドメイン</TableHead>
                                    </TableRow>
                                  </TableHeader>                <TableBody>
                  {subdomains.map((sub, index) => (
                    <TableRow key={`sub-${index}`}>
                      <TableCell>{sub}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-muted-foreground">crt.sh でサブドメインは見つかりませんでした。</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
