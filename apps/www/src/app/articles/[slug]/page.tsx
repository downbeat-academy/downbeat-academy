import { getArticle, getAllArticleSlugs } from './queries';

export const dynamicParams = true

export async function generateStaticParams() {
  return await getAllArticleSlugs()
}

export default async function Article({ params }) {

  const data = await getArticle({ slug: params.slug });

  const {
    title,
    content,
    excerpt,
    date,
    _updatedAt,
    authors,
    categories,
    featuredImage,
    metadata,
    slug
  } = data || {}

  return (<h1>{title}</h1>)
}
