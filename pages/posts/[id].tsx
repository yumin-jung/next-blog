import { getAllPostIds, getPostData } from "@/lib/posts"
import { type GetStaticPaths, type GetStaticProps } from "next"
import Head from "next/head"
import React from "react"
import Comment from "@/components/comment"
import { motion } from "framer-motion"
import Emoji from "@/components/emoji"

const variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
}

/**
 * yyyy-mm-dd 형태의 데이터를 년, 월, 일 형태로 변환한다.
 * @param {string} inputDate - yyyy-mm-dd 형태의 날짜 형식 문자열
 * @returns {string}
 */
function formatDate(inputDate: string): string {
  const date = new Date(inputDate)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return year + "년 " + month + "월 " + day + "일"
}

/**
 * code 태그 내부를 제외한 newline을 <br/>로 치환한다.
 * @param {string} inputHtml - html 형식의 문자열
 * @returns {string}
 */
function formatHtml(inputHtml: string): string {
  const regex = /<code[\s\S]*?<\/code>|(\n)/g
  return inputHtml.replace(regex, (match, group) => {
    return group ? "<br/>" : match
  })
}

const Post = ({
  postData,
}: {
  postData: {
    title: string
    date: string
    contentHtml: string
    emoji: string
  }
}) => {
  return (
    <motion.div
      className="max-w-xl mt-16 mb-24 mx-auto px-4 py-0"
      initial="hidden"
      animate="visible"
      variants={variants}
    >
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article className="mb-12">
        <h1 className="text-[1.6rem] leading-[1.4] mt-8 flex">
          {postData.title}&nbsp;
          <Emoji emoji={postData.emoji} />
        </h1>
        <div className="text-[0.9rem] mt-4 mb-8">{formatDate(postData.date)}</div>
        <div
          className="text-[1.1rem] leading-[1.8] font-light text-justify"
          dangerouslySetInnerHTML={{ __html: formatHtml(postData.contentHtml) }}
        />
      </article>
      <Comment />
    </motion.div>
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
