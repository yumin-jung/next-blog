---
title: "블로그 코드 하이라이트 적용 🎨"
date: "2024-02-10"
---

블로그에 코드의 문법을 보기 쉽게 강조해주는 코드 문법 하이라이트를 적용했다. 이제 다음과 같이 코드 블록을 사용하면 코드의 가독성이 좋아진다!!

```ts
console.log("Hello Syntax Highliter");
```

코드 문법 하이라이트를 적용하며 간단하게 해결한 문제가 하나 있었다. 현재 블로그의 md파일은 remark를 사용하여 html로 변환이 되고 있다. 하지만 md파일을 html파일로 변환하는 과정에서 newline이 사라져 문단이 나누어지지 않는 문제가 있었다. 그래서 처음에는 다음과 같이 newline을 br 태그로 바꾸어주는 방법을 사용했다.

```ts
const html = postData.contentHtml.replace(/\r?\n/g, '<br />');
```

하지만 코드 문법 하이라이트를 적용했을때 위 방법은 code 태그 내부의 newline도 모두 바꿔 code 태그 내부의 코드들이 한 줄로 나오게 되는 문제가 있었다.

```ts
const regex = /<code[\s\S]*?<\/code>|(\n)/g;
const html = postData.contentHtml.replace(regex, (match, group) => {
    return group ? '<br/>' : match;
});
```

따라서 위와 같이 code 태그 내부에서는 바꾸지 않도록 regex를 사용하여 바꿔주었다. regex 잘 알아두면 좋은 것 같다. 그런데 이 방법이 최선인지는 모르겠다.
