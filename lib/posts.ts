import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import rehypeStringify from "rehype-stringify"
import rehypePrettyCode from "rehype-pretty-code"

const postsDirectory = path.join(process.cwd(), "posts")

interface AllPostsData {
  date: string
  title: string
  id: string
  emoji: string
}

/**
 * posts 디렉터리에 있는 md 파일의 데이터를 불러와 날짜순으로 정렬하여 반환한다.
 * @returns {AllPostsData[]}
 */
export function getSortedPostsData(): AllPostsData[] {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "")
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const matterResult = matter(fileContents)

    return {
      id,
      ...(matterResult.data as { date: string; title: string; emoji: string }),
    }
  })

  return allPostsData.sort((a, b) => {
    return a.date < b.date ? 1 : -1
  })
}

interface GetAllPostIds {
  params: {
    id: string
  }
}

/**
 * posts 디렉터리에 있는 모든 파일의 데이터 중
 * id를 불러와 날짜순으로 정렬하여 반환한다.
 * @returns {GetAllPostIds[]}
 */
export function getAllPostIds(): GetAllPostIds[] {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    }
  })
}

interface GetPostData {
  id: string
  contentHtml: string
  date: string
  title: string
  emoji: string
}

/**
 * posts 디렉터리에서 id에 해당하는 데이터를 불러와
 * 스타일링하여 id, date, title과 함께 반환한다.
 * @param {string} id
 * @returns {Promise<GetPostData>}
 */
export async function getPostData(id: string): Promise<GetPostData> {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, "utf-8")
  const matterResult = matter(fileContents)
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypePrettyCode, {
      theme: "material-theme",
    })
    .use(rehypeStringify)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    id,
    contentHtml,
    ...(matterResult.data as { date: string; title: string; emoji: string }),
  }
}
