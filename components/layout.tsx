import { SpeedInsights } from "@vercel/speed-insights/next"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <SpeedInsights />
    </div>
  )
}
