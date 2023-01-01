import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import { GET_ALL_ARTICLES, GET_ARTICLE_PATHS } from "@lib/queries"

export default function Article({ data, preview }) {

    return (<h1>Article title</h1>)
}