import { useEffect, useRef } from "react";

export default function Comment() {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const scriptElement = document.createElement('script');
        scriptElement.async = true;
        scriptElement.crossOrigin = 'anonymous';
        scriptElement.src = 'https://utteranc.es/client.js';
        scriptElement.setAttribute('issue-term', 'pathname');
        scriptElement.setAttribute('label', 'comment');
        scriptElement.setAttribute('repo', 'yumin-jung/next-blog');
        scriptElement.setAttribute('theme', 'github-light');
        ref.current?.appendChild(scriptElement);
    }, []);

    return <div ref={ref} />;
}