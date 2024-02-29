interface SVG {
  emoji: string
  width?: string
}

export default function Emoji({ emoji, width }: SVG) {
  const Emoji = require(`../public/assets/${emoji}.svg`).default
  return <Emoji width={width ? width : "1rem"} className="ml-1" />
}
