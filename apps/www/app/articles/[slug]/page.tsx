import { sanityClient } from '@lib/sanity.client'
import { articlesBySlugQuery, articleSlugsQuery } from '@lib/sanity.queries';
import { ArticlePayload } from '@types';

// This is referencing the async call from sanity.client
// async function getArticle(params) {
//   const article = await getArticleBySlug({ slug: params.slug })

//   return article
// }

export const dynamicParams = true

export async function generateStaticParams() {
  const slugs = (await sanityClient.fetch<string[]>(articleSlugsQuery)) || []

  return slugs.map((slug) => ({ slug }))
}

// This is migrating the async call from sanity.client to this server component 
async function getArticle({ slug }): Promise<ArticlePayload | undefined> {
  const article = await sanityClient?.fetch(
    articlesBySlugQuery,
    { slug, next: { revalidate: 60 } },
  )

  return article
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
