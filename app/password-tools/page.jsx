"use client"

import { useState, useCallback, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider" // Sliderコンポーネントを追加
import { Checkbox } from "@/components/ui/checkbox" // Checkboxコンポーネントを追加
import { Progress } from "@/components/ui/progress" // Progressコンポーネントを追加
import { Copy } from "lucide-react" // Copy iconを追加
import { useToast } from "@/hooks/use-toast" // useToast hookを追加

export default function PasswordToolsPage() {
  const { toast } = useToast()

  // Password Generator States
  const [length, setLength] = useState(12)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(false)
  const [generatedPassword, setGeneratedPassword] = useState("")

  // Password Strength Checker States
  const [checkedPassword, setCheckedPassword] = useState("")
  const [strengthScore, setStrengthScore] = useState(0)
  const [strengthText, setStrengthText] = useState("非常に弱い")
  const [strengthColor, setStrengthColor] = useState("red")

  const generatePassword = useCallback(() => {
    const lower = "abcdefghijklmnopqrstuvwxyz"
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const numbers = "0123456789"
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?/~"

    let characters = ""
    if (includeLowercase) characters += lower
    if (includeUppercase) characters += upper
    if (includeNumbers) characters += numbers
    if (includeSymbols) characters += symbols

    if (characters.length === 0) {
      setGeneratedPassword("少なくとも1つの文字タイプを選択してください。")
      return
    }

    let newPassword = ""
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      newPassword += characters[randomIndex]
    }
    setGeneratedPassword(newPassword)
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols])

  useEffect(() => {
    generatePassword()
  }, [generatePassword])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPassword)
    toast({
      title: "コピーしました！",
      description: "パスワードがクリップボードにコピーされました。",
    })
  }

  const checkPasswordStrength = useCallback((password) => {
    let score = 0
    const feedback = []

    // Length
    if (password.length >= 8) score += 1
    if (password.length >= 12) score += 1
    if (password.length >= 16) score += 1

    // Character types
    const hasLower = /[a-z]/.test(password)
    const hasUpper = /[A-Z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    const hasSymbol = /[!@#$%^&*()_+\-=[\]{}|;:,.<>?/~]/.test(password)

    let charTypeCount = 0
    if (hasLower) charTypeCount++
    if (hasUpper) charTypeCount++
    if (hasNumber) charTypeCount++
    if (hasSymbol) charTypeCount++

    if (charTypeCount >= 2) score += 1
    if (charTypeCount >= 3) score += 1
    if (charTypeCount >= 4) score += 1

    // Entropy (simplified)
    let entropy = 0
    if (hasLower) entropy += 26
    if (hasUpper) entropy += 26
    if (hasNumber) entropy += 10
    if (hasSymbol) entropy += 32 // Common symbols

    if (password.length > 0) {
      const bits = password.length * Math.log2(entropy)
      if (bits >= 60) score += 1 // Good for general use
      if (bits >= 80) score += 1 // Excellent
      if (bits >= 100) score += 1 // Very strong
    }

    let text = "Very Weak"
    let color = "red"
    let progressValue = 0

    if (score >= 8) {
      text = "非常に強い"
      color = "green"
      progressValue = 100
    } else if (score >= 6) {
      text = "強い"
      color = "lime"
      progressValue = 80
    } else if (score >= 4) {
      text = "中程度"
      color = "yellow"
      progressValue = 60
    } else if (score >= 2) {
      text = "弱い"
      color = "orange"
      progressValue = 40
    } else if (password.length > 0) {
      text = "非常に弱い"
      color = "red"
      progressValue = 20
    } else {
      text = "パスワードを入力"
      color = "gray"
      progressValue = 0
    }

    setStrengthScore(progressValue)
    setStrengthText(text)
    setStrengthColor(color)
  }, [])

  useEffect(() => {
    checkPasswordStrength(checkedPassword)
  }, [checkedPassword, checkPasswordStrength])

  // 強度ごとの色クラス
  const strengthColorClass = {
    green: "text-green-500",
    lime: "text-lime-500",
    yellow: "text-yellow-500",
    orange: "text-orange-500",
    red: "text-red-500",
    gray: "text-gray-500",
  }

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">パスワード生成ツール</CardTitle>
        <CardDescription>強力なパスワードを生成し、パスワードの強度を確認します。</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-8 md:grid-cols-2">
        {/* Password Generator Section */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">パスワードジェネレーター</h3>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="password-length">長さ: {length}</Label>
              <Slider
                id="password-length"
                min={6}
                max={32}
                step={1}
                value={[length]}
                onValueChange={(val) => setLength(val[0])}
                className="w-full"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="include-uppercase" checked={includeUppercase} onCheckedChange={setIncludeUppercase} />
              <Label htmlFor="include-uppercase">大文字を含める (A-Z)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="include-lowercase" checked={includeLowercase} onCheckedChange={setIncludeLowercase} />
              <Label htmlFor="include-lowercase">小文字を含める (a-z)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="include-numbers" checked={includeNumbers} onCheckedChange={setIncludeNumbers} />
              <Label htmlFor="include-numbers">数字を含める (0-9)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="include-symbols" checked={includeSymbols} onCheckedChange={setIncludeSymbols} />
              <Label htmlFor="include-symbols">記号を含める (!@#$%)</Label>
            </div>
            <Button onClick={generatePassword} className="w-full">
              パスワードを生成
            </Button>
            <div className="relative flex items-center">
              <Input
                type="text"
                readOnly
                value={generatedPassword}
                className="pr-10 font-mono"
                placeholder="生成されたパスワード"
              />
              <Button variant="ghost" size="icon" onClick={copyToClipboard} className="absolute right-1">
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Password Strength Checker Section */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold">パスワード強度チェッカー</h3>
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="check-password">パスワードを入力</Label>
              <Input
                id="check-password"
                type="text"
                value={checkedPassword}
                onChange={(e) => setCheckedPassword(e.target.value)}
                placeholder="ここにパスワードを入力してください"
              />
            </div>
            <div className="space-y-2">
              <Label>
                強度:{" "}
                <span className={`font-bold ${strengthColorClass[strengthColor]}`}>
                  {strengthText}
                </span>
              </Label>
              <Progress
                value={strengthScore}
                className={`w-full
      [&::-webkit-progress-bar]:bg-gray-200
      ${
        strengthColor === "green"
          ? "[&::-webkit-progress-value]:bg-green-500"
          : strengthColor === "lime"
          ? "[&::-webkit-progress-value]:bg-lime-500"
          : strengthColor === "yellow"
          ? "[&::-webkit-progress-value]:bg-yellow-500"
          : strengthColor === "orange"
          ? "[&::-webkit-progress-value]:bg-orange-500"
          : strengthColor === "red"
          ? "[&::-webkit-progress-value]:bg-red-500"
          : "[&::-webkit-progress-value]:bg-gray-500"
      }
      dark:[&::-webkit-progress-bar]:bg-gray-700`}
              />
            </div>
            <div className="text-sm text-muted-foreground">
              <p>強力なパスワードのためのヒント:</p>
              <ul className="list-disc pl-5">
                <li>大文字と小文字を混ぜて使用する。</li>
                <li>数字と記号を含める。</li>
                <li>最低12文字の長さにする。</li>
                <li>推測しやすい情報（例：誕生日、名前）は避ける。</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
