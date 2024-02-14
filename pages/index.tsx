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
          <title>Yumin</title>
        </Head>
        <section className={`text-[1.2rem] leading-normal pt-px`}>
          <h2 className={`text-2xl leading-[1.4] mx-0 my-4`}>기록 남기기 📝</h2>
          <ul className={`flex flex-col gap-4 pt-6`}>
            {allPostsData.map(({ id, title }) =>
              <Link
                key={id}
                href={`/posts/${[id]}`}
                style={{ textDecoration: 'none' }}
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