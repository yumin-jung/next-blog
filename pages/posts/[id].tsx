'use client';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-light.css';
import { getAllPostIds, getPostData } from '@/lib/posts'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import React, { useEffect } from 'react';
import homeStyles from '../../styles/Home.module.css'
import postStyle from '../../styles/Post.module.css'
import Comment from "@/components/Comment"

const Post = ({ postData }: {
    postData: {
        title: string
        date: string
        contentHtml: string
    }
}) => {
    useEffect(() => {
        hljs.highlightAll();
    }, []);

    // code tag 안에서는 newline이 <br/>이 되지 않고 나머지 경우만 적용
    const regex = /<code[\s\S]*?<\/code>|(\n)/g;
    const html = postData.contentHtml.replace(regex, (match, group) => {
        return group ? '<br/>' : match;
    });;

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
            <section>
                <Comment />
            </section>
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