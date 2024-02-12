import Head from "next/head"
import homeStyles from '../styles/Home.module.css'
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
      <div className={homeStyles.container}>
        <Head>
          <title>Yumin</title>
        </Head>
        <section className={`${homeStyles.headingMd} ${homeStyles.padding1px}`}>
          <h2 className={homeStyles.headingLg}>기록 남기기 📝</h2>
          <ul className={homeStyles.grid}>
            {allPostsData.map(({ id, title }) =>
              <div key={id}>
                <Link href={`/posts/${[id]}`} style={{ textDecoration: 'none' }}>
                  <div className={homeStyles.gridItem}>{title}</div>
                </Link>
              </div>
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