import Head from "next/head"
import { GetStaticProps } from "next"
import { getSortedPostsData } from "@/lib/posts"
import Link from "next/link"
import { motion } from "framer-motion"

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
}

const item = {
  hidden: { y: 20, opacity: 0 },
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
  }[]
}) => {
  return (
    <>
      <div className="max-w-xl mt-12 mb-24 mx-auto px-4 py-0">
        <Head>
          <title>기록 남기기</title>
        </Head>
        <section className="text-[1.2rem] leading-normal pt-px">
          <h2 className="text-2xl leading-[1.4] mx-0 my-4 pl-2">기록 남기기 📝</h2>
          <motion.ul
            className="grid gap-4 pt-6 grid-cols-[repeat(2,1fr)]
                  md:grid-cols-[repeat(3,1fr)]"
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
                <Link
                  key={id}
                  href={`/posts/${[id]}`}
                  style={{ textDecoration: "none" }}
                  className="flex flex-col text-base aspect-[1.2] items-center
                shadow-[rgba(0,0,0,0.1)_0px_4px_12px] p-6 rounded-lg"
                >
                  {title}
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
