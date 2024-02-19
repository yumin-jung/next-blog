---
title: "블로그에 Framer Motion으로 애니메이션 적용하기 ✨"
date: "2024-02-19"
---

블로그에 Framer Motion을 추가하여 애니메이션을 적용했다. 이번 글에서는 Framer Motion을 적용하는 과정에서 느낀 장단점을 기록하려고 한다.

이전 코드에서는 애니메이션의 경우 tailwind.config.ts 파일에서 직접 애니메이션을 추가하여 구현했다. 하지만 이 방법은 컴포넌트에서 코드를 작성할 때 해당 애니메이션을 확인하려면 다시 tailwind.config.ts 파일을 확인해야 한다는 불편함이 있었다. 그렇다고 컴포넌트에서 코드를 작성하자니 코드가 지저분해 보이는 단점이 있었다. 특히 react-spring에서의 애니메이션처럼 부드럽고 슬릭한 애니메이션을 Tailwind CSS로 구현하려면 코드의 길이가 많이 길어졌다.

Framer Motion을 도입하여 이러한 문제를 해결하였다. 우선 애니메이션이 적용된 코드가 포함된 파일에서 어떤 애니메이션을 적용하였는지 바로 확인할 수 있었다. 스타일 관련 코드가 작성되어 있는 파일을 찾고, 파일을 넘나들며 확인하는 것보다 스크롤만 하면 해당 애니메이션 관련 코드를 찾을 수 있다는 점이 시간을 많이 아껴주어 생산성을 높여주었다. 또한 다음 코드와 같이 슬릭한 애니메이션을 간단한 코드로 작성할 수 있어 코드만 보고 애니메이션을 직관적으로 상상할 수 있었다.

```js
transition={{ type: "spring", stiffness: 400, damping: 17 }}
```

러닝 커브가 적다는 것도 큰 장점이라고 생각한다. 예전에 matter-js를 사용해 본 경험이 있어서 그런지는 몰라도 애니메이션에 물리적 요소를 적용하여 현실적으로 보이게 하는 부분을 적용하기가 쉬웠다. 또한 framer-motion에서 motion을 import한 뒤 ul을 motion.ul로 바꾸거나 li를 motion.li로 바꾸기만 하고 효과를 적용하면 돼서 애니메이션을 금방 적용할 수 있었다. 나의 경우 공식 문서를 보며 블로그 애니메이션을 적용하는 데 10분도 걸리지 않았다.

```js
const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

<motion.ul
    variants={container}
    initial="hidden"
    animate="visible"
    >
    {allPostsData.map(({ id, title }) => (
        <motion.li
            key={id}
            variants={item}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
        ...
        </motion.li>
    ))}
</motion.ul>
```

또 다른 장점으로는 현재(2024년 2월 19일) 기준으로 6일 전에 커밋이 있었던, 최근까지도 활발하게 성장하고 있는 라이브러리이기 때문에 최근 기술을 더욱 많이 지원할 것이라는 점, anime.js, react-spring과 비교하여 주간 다운로드 수가 훨씬 많아 레퍼런스를 더욱 많이 찾을 수 있을 것이라는 점이 있을 것 같다. 마지막으로 디자인 툴인 Framer와 함께 사용한다면 디자이너와의 협업에 큰 도움을 줄 수 있을 것 같다. 서로의 언어를 같은 용어로 통일할 수 있지 않을까?

단점으로는 번들 사이즈를 들 수 있을 것 같다. bundlephobia에서 확인한 결과 minified 기준으로 animejs@3.2.2는 17.5kB, react-spring@9.7.3은 51kB인 반면에 framer-motion@11.0.5은 129.1kB으로 번들 사이즈가 크다. 따라서 몇 가지 애니메이션만을 구현하기 위해 사용할 목적이라면 굳이 사용할 이유가 있을까라는 생각이 든다. 하지만 tree-shaking을 할 수 있기 때문에 어느 정도 보완이 가능할 것이고, 서비스가 커지는 단계에서 이후에 많은 애니메이션을 관리해야 될 것 같다면 미리 도입하는 것도 좋지 않을까..라는 생각이 들었다. (이 부분은 나도 서비스가 커지는 단계를 경험해 본 적이 없어 말하기 조심스럽다..)
