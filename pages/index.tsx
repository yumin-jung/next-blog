import Head from "next/head"
import homeStyles from '../styles/Home.module.css'
import { GetStaticProps } from "next"
import { getSortedPostsData } from "@/lib/posts"
import Link from "next/link"

const Home = ({ allPostsData }: {
  allPostsData: {
    date: string
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
        <section className={homeStyles.headingMd}>
          <section className={`${homeStyles.headingMd} ${homeStyles.padding1px}`}>
            <h2 className={homeStyles.headingLg}>기록 남기기</h2>
            <ul className={homeStyles.list}>
              {allPostsData.map(({ id, title, date }) =>
                <li className={homeStyles.listItem} key={id}>
                  <Link href={`/posts/${[id]}`}>
                    {title}
                  </Link>
                  <br />
                  <small className={homeStyles.lightText}>
                    {date}
                  </small>
                </li>
              )}
            </ul>
          </section>
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