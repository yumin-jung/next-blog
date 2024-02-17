import { getAllPostIds, getPostData } from "@/lib/posts"
import { type GetStaticPaths, type GetStaticProps } from "next"
import Head from "next/head"
import React from "react"
import Comment from "@/components/Comment"

const Post = ({
  postData,
}: {
  postData: {
    title: string
    date: string
    contentHtml: string
  }
}) => {
  /* code tag 안에서는 newline이 <br/>이 되지 않고 나머지 경우만 적용 */
  const regex = /<code[\s\S]*?<\/code>|(\n)/g
  const html = postData.contentHtml.replace(regex, (match, group) => {
    return group ? "<br/>" : match
  })

  /**
   * yyyy-mm-dd 형태의 데이터를 년, 월, 일 형태로 변환한다.
   * @param {string} inputDate - yyyy-mm-dd 형태의 날짜 형식 문자열
   * @returns {string}
   */
  const formatDate = (inputDate: string): string => {
    const date = new Date(inputDate)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    return year + "년 " + month + "월 " + day + "일"
  }

  const postDate = formatDate(postData.date)

  return (
    <div className="max-w-xl mt-16 mb-24 mx-auto px-4 py-0">
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className="text-[1.6rem] leading-[1.4] mt-8">{postData.title}</h1>
        <div className="text-[0.9rem] mt-4 mb-8">{postDate}</div>
        <div
          className="text-[1.1rem] leading-[1.8] font-light"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>
      <Comment />
    </div>
  )
}

export default Post

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params!.id as string)
  return {
    props: {
      postData,
    },
  }
}
