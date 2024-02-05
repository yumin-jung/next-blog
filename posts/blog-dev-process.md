---
title: "블로그 제작기"
date: "2024-02-05"
---

***
3일 전인 2024년 2월 2일에 yumin.blog 도메인을 구매했다. 가장 가지고 싶었던 도메인은 yumin.dev 였는데 이미 다른 분이 사용하고 계셔서 yumin.blog로 구매하게 되었다. 도메인 구매의 경우 가비아, Cafe24, GoDaddy, Porkbun을 비교하여 가격이 가장 저렴한 Porkbun에서 구매했다. 사실 아직 성능, 보안적인 측면에서 어느정도의 차이가 있는지는 잘 모르고 있어서 1년 정도 블로그를 운영해보면서 차근차근 알아갈 생각이다.  

***
나는 React.js 혹은 Next.js 프로젝트의 경우 매일 Vercel로만 배포를 했는데 실제 서비스의 경우 Vercel, Netlify로 배포를 하게 되면 사용량의 어느 임계치부터 비용이 크게 증가한다는 사실을 알게 되었고, 또 실제 현업에서 많이 사용되는 AWS를 이용해보는 경험도 나중에 회사에서 업무를 할 때 분명히 언젠가 도움이 되지 않을까 생각하여 AWS에서 배포를 하게 되었다. 그래서 AWS에서 EC2 인스턴스를 생성하고 탄력적 IP를 추가하였고, 우분투 서버에서 nginx로 리버스 프록시 설정을 하였다. 추가로 https 연결을 위한 토큰을 발급하고 AWS EC2 인스턴스를 CloudFront로 배포하였다.

***
해당 과정을 진행하며 10개 정도의 블로그 글을 확인한 것 같은데, 현 시점에서 AWS의 용어가 바뀌거나 Node의 LTS 버전이 달라졌다거나 하는 차이가 있어(Next.js도 벌써 14버전이 나왔다.) 새롭게 블로그 글을 작성하는 것도 AWS를 이용하여 배포를 하고자 하는 분들에게 도움이 될 것 같아, 하고 있는 일이 마무리되면 세부적으로 글을 작성해보려고 한다.

***
우선 지금은 맥북에서 push를 하면 AWS 서버에 자동으로 pull되어 배포되는 자동화를 GitHub Actions로 구축하려고 한다. 해당 과정이 완료되면 스타일링을 조금 해야겠다. css 라이브러리도 어떤 것을 사용해야 될지 고민중이다. css라이브러리의 성능, 생산성 부분에 대해 고민하고 적용하고 싶어서 create-next-app을 할 때 TailwindCSS를 설치하지 않았는데 css-in-js 방식의 Emotion과 같은 친구들은 SSR을 적용할 때 이슈가 있는 듯 하다. 여러가지 고민하면서 찾아보고 결정해야겠다.

***
다음 글은 아마 최근에 마무리한 NH-KAIST Research & Testing 업무 회고가 될 것 같다. 최종 보고에서 좋은 피드백을 받았기 때문에 나 스스로도 업무에 있어서 어떤 점이 프로젝트를 좋은 방향으로 이끌었는지 기록하여 이후 업무에 적용하면 좋지 않을까 생각한다.

***