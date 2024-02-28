---
title: "Yarn Berry로의 마이그레이션"
date: "2024-02-10"
emoji: "CatFace"
---

블로그 레포의 패키지 매니저를 Yarn에서 Yarn Berry로 옮겼다. Yarn Berry는 토스의 [node_modules로부터 우리를 구원해 줄 Yarn Berry](https://toss.tech/article/node-modules-and-yarn-berry)에서 처음 알게 되었는데 이번에 GitHub Action으로 AWS에 CI/CD를 구축하는 단계에서 시간을 줄이기 위해 실험을 해 볼 기회가 생겼다.

결론부터 말하자면 Github Actions에서는 약 1분 18초에서 약 1분 8초로 성능이 개선되었고, AWS CodeDeploy에서도 약 55초에서 약 21초로 성능 개선이 있었다. 아무래도 node_modules보다 의존성 관련 파일의 용량이 줄어들어 AWS S3에 zip파일을 전송하는 데 걸리는 시간이 줄어들었기 때문인 것 같다.

Yarn Berry의 PnP 설정을 통한 Zero-Install을 하려고 하였지만 완벽하게 되지는 않았다. 나의 경우에는 next-swc 관련한 의존성들이 .yarn/unplugged에 저장되어 git clone만으로는 실행이 되지 않았고 다시 yarn 명령어로 설치를 해주어야 했다. 하지만 거의 2초 정도에 모두 설치가 됐기 때문에 node_modules의 설치 속도와 비교했을 때는 큰 차이가 있었다.

Yarn Berry 도입 과정에서 [Turborepo와의 호환 이슈가 있다는 글](https://blog.dramancompany.com/2023/02/%EB%A6%AC%EB%A9%A4%EB%B2%84-%EC%9B%B9-%EC%84%9C%EB%B9%84%EC%8A%A4-%EC%A2%8C%EC%B6%A9%EC%9A%B0%EB%8F%8C-yarn-berry-%EB%8F%84%EC%9E%85%EA%B8%B0/)도 보았다. 모노레포의 구축을 도와주는 도구인 Turborepo와 Yarn Berry가 호환성 이슈가 있어 pnpm을 사용한다는 내용이었다. 여기서 궁금했던 부분은 모노레포 구축 도구에는 Lerna, Turborepo, Nx도 있는 것으로 알고 있는데 다른 조합에서는 Yarn Berry가 도입이 가능할지, 가능하다면 왜 그 조합 대신 다른 조합을 사용하게 되었는지이다. 더 알아봐야겠다.

아직 모르는 게 너무 많다..
