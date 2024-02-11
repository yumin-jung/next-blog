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

    /**
     * yyyy-mm-dd 형태의 데이터를 년, 월, 일 형태로 변환한다.
     * @param {string} inputDate - yyyy-mm-dd 형태의 날짜 형식 문자열
     * @returns {string}
     */
    const formatDate = (inputDate: string): string => {
        const date = new Date(inputDate);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        return year + '년 ' + month + '월 ' + day + '일';
    }

    const postDate = formatDate(postData.date);

    return (
        <div className={postStyle.container}>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={homeStyles.headingXl}>{postData.title}</h1>
                <div className={homeStyles.subheading}>{postDate}</div>
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