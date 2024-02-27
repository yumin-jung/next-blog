import "@/styles/globals.css"
import type { AppProps } from "next/app"
import Layout from "@/components/layout"
import localFont from "next/font/local"

const pretendard = localFont({
  src: [
    {
      path: "../public/fonts/PretendardVariable.woff2",
      weight: "200",
    },
  ],
})

const tossface = localFont({
  src: [
    {
      path: "../public/fonts/TossFaceFontWeb.otf",
      weight: "400",
    },
  ],
})

const sourcecodepro = localFont({ src: "../public/fonts/SourceCodePro-Regular.otf" })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <style jsx global>{`
        :root {
          --pretendard-font: ${pretendard.style.fontFamily};
          --tossface-font: ${tossface.style.fontFamily};
          --sourcecodepro-font: ${sourcecodepro.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </Layout>
  )
}
