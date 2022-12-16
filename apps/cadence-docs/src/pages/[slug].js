import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import { pagePaths, PAGE_PATH } from '../utils/mdxUtils'

export default function Page({ source, frontmatter }) {

    return (
        <div>
            <h1>{frontmatter.title}</h1>
            <MDXRemote {...source} />
        </div>
    )
}

export async function getStaticProps({ params }) {
    const pagePath = path.join(PAGE_PATH, `${params.slug}.mdx`)
    const source = fs.readFileSync(pagePath)

    const { content, data } = matter(source)

    const mdxSource = await serialize(content, {
        mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: [],
        },
        scope: data,
    })

    return {
        props: {
            source: mdxSource,
            frontmatter: data,
        }
    }
}

export async function getStaticPaths() {
    const paths = pagePaths
        // Remove file extensions for page paths
        .map((path) => path.replace(/\.mdx?$/, ''))
        // Map the path into the static paths object required by Next.js
        .map((slug) => ({ params: { slug }}))

    return {
        paths,
        fallback: false,
    }
}