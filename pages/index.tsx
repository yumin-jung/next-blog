import Head from "next/head"
import { GetStaticProps } from "next"
import { getSortedPostsData } from "@/lib/posts"
import Link from "next/link"

const Home = ({ allPostsData }: {
  allPostsData: {
    title: string
    id: string
  }[]
}) => {
  return (
    <>
      <div className={`max-w-xl mt-12 mb-24 mx-auto px-4 py-0`}>
        <Head>
          <title>기록 남기기</title>
        </Head>
        <section className={`text-[1.2rem] leading-normal pt-px`}>
          <h2 className={`text-2xl leading-[1.4] mx-0 my-4`}>기록 남기기 📝</h2>
          <ul className={`grid grid-cols-[repeat(3,1fr)] gap-4 pt-6`}>
            {allPostsData.map(({ id, title }) =>
              <Link
                key={id}
                href={`/posts/${[id]}`}
                style={{ textDecoration: 'none' }}
                className={`text-base aspect-[1.2] hover:animate-wiggle
                flex flex-col items-center shadow-[rgba(0,0,0,0.1)_0px_4px_12px] 
                p-6 rounded-lg`}
              >
                {title}
              </Link>
            )}
          </ul>
        </section>
      </div >
    </>
  );
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData
    }
  }
}