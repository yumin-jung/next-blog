import Head from "next/head"
import { GetStaticProps } from "next"
import { getSortedPostsData } from "@/lib/posts"
import Link from "next/link"
import { motion } from "framer-motion"
import Emoji from "@/components/emoji"

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { y: 10, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
}

const Home = ({
  allPostsData,
}: {
  allPostsData: {
    title: string
    id: string
    emoji: string
  }[]
}) => {
  return (
    <>
      <div className="max-w-xl mt-12 mb-24 mx-auto px-4 py-0">
        <Head>
          <title>기록 남기기</title>
        </Head>
        <section className="text-[1.2rem] leading-normal pt-px">
          <h2
            className="text-2xl leading-[1.4] my-4 pl-4 z-1 pb-3 relative
          before:content-[''] before:absolute before:left-2 before:bottom-0
          before:h-px before:w-32 before:border-b-2 before:border-solid
          before:border-sky-100"
          >
            기록 남기기
          </h2>
          <motion.ul className="" variants={container} initial="hidden" animate="visible">
            {allPostsData.map(({ id, title, emoji }) => (
              <motion.li
                key={id}
                variants={item}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Link
                  key={id}
                  href={`/posts/${[id]}`}
                  style={{ textDecoration: "none" }}
                  className="flex flex-col text-base p-2 rounded-lg"
                >
                  <div className="mb-1 flex">
                    <Emoji emoji={emoji} />
                    &nbsp;&nbsp;{title}
                  </div>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </section>
      </div>
    </>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData,
    },
  }
}
