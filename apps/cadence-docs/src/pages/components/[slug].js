import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote'
import { componentPaths, COMPONENT_PATH } from '../../utils/mdxUtils'
import { MDXComponents } from '../../lib/mdxComponents'

export default function ComponentPage({ source, frontmatter }) {
    return (
        <div>
            <h1>{frontmatter.title}</h1>
            <MDXRemote {...source} components={MDXComponents}/>
        </div>
    )
}

export const getStaticProps = async ({ params }) => {
    const componentPath = path.join(COMPONENT_PATH, `${params.slug}.mdx`)
    const source = fs.readFileSync(componentPath)

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

export const getStaticPaths = async () => {
    const paths = componentPaths
        // Remove file extensions for page paths
        .map((path) => path.replace(/\.mdx?$/, ''))
        // Map the path into the static paths object required by Next.js
        .map((slug) => ({ params: { slug }}))

    return {
        paths,
        fallback: false,
    }
}