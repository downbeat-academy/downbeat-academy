import { sanityClient } from '@lib/sanity.client'
import { GET_ALL_ARTICLES } from "@lib/sanity.queries"
import { getArticleBySlug } from '@lib/sanity.client'

// async function getArticle(params) {
//   const article = await sanityClient.fetch(GET_ALL_ARTICLES, { next: { revalidate: 60 } });
//   return article;
// }

// export async function generateStaticParams() {
//   const paths = await getArticlesBySlug();

//   return paths.map((path) => ({
//     params: {
//       slug: path.slug,
//     }
//   }));
// }

async function getArticle(params) {
  // const article = await sanityClient.fetch(GET_ALL_ARTICLES, { next: { relvalidate: 60 } });
  const article = await getArticleBySlug({ slug: params.slug })

  // if (!article.ok) {
  //   throw new Error('Failed to fetch data')
  // }

  return article
}

export default async function Article({ params }: {
  params: {
    slug: string,
  }
}) {

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
