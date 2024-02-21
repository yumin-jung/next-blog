import { SpeedInsights } from "@vercel/speed-insights/next"
import { Noto_Sans_KR } from "next/font/google"

const notoSansKr = Noto_Sans_KR({
  weight: ["300"],
  subsets: [],
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={notoSansKr.className}>
      {children}
      <SpeedInsights />
    </div>
  )
}
