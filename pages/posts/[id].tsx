import { getAllPostIds, getPostData, getSortedPostsData } from '@/lib/posts'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'
import homeStyles from '../../styles/Home.module.css'
import postStyle from '../../styles/Post.module.css'

const Post = ({ postData }: {
    postData: {
        title: string
        date: string
        contentHtml: string
    }
}) => {
    const html = postData.contentHtml.replace(/\r?\n/g, '<br />');
    return (
        <div className={postStyle.container}>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={homeStyles.headingXl}>{postData.title}</h1>
                <div className={homeStyles.subheading}>{postData.date}</div>
                <div
                    className={homeStyles.bodyMd}
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            </article>
        </div>
    )
}

export default Post

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const postData = await getPostData(params!.id as string);
    return {
        props: {
            postData
        }
    }
}