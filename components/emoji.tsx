interface SVG {
  emoji: string
}

export default function Emoji({ emoji }: SVG) {
  const Emoji = require(`../public/assets/${emoji}.svg`).default
  return <Emoji width="24px" className="ml-1" />
}
