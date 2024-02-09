import { useEffect, useRef } from "react";

export default function Comment() {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const scriptElement = document.createElement("script");
        scriptElement.src = "https://giscus.app/client.js";
        scriptElement.async = true;
        scriptElement.crossOrigin = "anonymous";
        scriptElement.setAttribute("data-repo", "yumin-jung/next-blog")
        scriptElement.setAttribute("data-repo-id", "R_kgDOLMqCOg")
        scriptElement.setAttribute("data-category", "Announcements")
        scriptElement.setAttribute("data-category-id", "DIC_kwDOLMqCOs4CdFTO")
        scriptElement.setAttribute("data-mapping", "pathname")
        scriptElement.setAttribute("data-strict", "0")
        scriptElement.setAttribute("data-reactions-enabled", "1")
        scriptElement.setAttribute("data-emit-metadata", "0")
        scriptElement.setAttribute("data-input-position", "bottom")
        scriptElement.setAttribute("data-theme", "light")
        scriptElement.setAttribute("data-lang", "ko")
        ref.current?.appendChild(scriptElement);
    }, []);

    return <div ref={ref} />;
}