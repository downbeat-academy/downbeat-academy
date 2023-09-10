import { sanityClient } from "@lib/sanity.client";
import { articlesBySlugQuery, articlePaths } from "@lib/queries";
import { getSanityImageUrl } from "@utils/getSanityImage";
import { prettyDate } from "@utils/dateFormat";
import { Text } from '@components/text'
import { SectionContainer } from "@components/section-container";
import * as FeaturedItem from "@components/featured-item";
import { AuthorMetadata } from "@components/author";
import { RichText } from "@components/rich-text";
import { ModuleRenderer } from '@components/module-content'

// Generate the slugs/routes for the articles
export async function generateStaticParams() {
  const slugs = await sanityClient.fetch(
    articlePaths,
    {
      next: {
        revalidate: 60,
      }
    }
  )
  return slugs.map((slug) => ({ slug }));
}

// Render the article data
export default async function ArticleSlugRoute({ params }) {
  const { slug } = params
  const article = await sanityClient.fetch(
    articlesBySlugQuery,
    { slug },
    {
      next: {
        revalidate: 60,
      }
    }    
  )

  return (
    <>
      <SectionContainer>
        <FeaturedItem.Root>
          <FeaturedItem.Title>
            <Text
              tag='h1'
              type='expressive-headline'
              size='h1'
              color='high-contrast'
              collapse
            >{article.title}</Text>
            <Text
              tag='p'
              type='expressive-body'
              size='body-large'
              color='high-contrast'
              collapse
            >{article.excerpt}</Text>
          </FeaturedItem.Title>
          <FeaturedItem.Image
            image={getSanityImageUrl(article.featuredImage.image.asset).url()}
            alt={article.featuredImage.alternativeText}
          />
          <FeaturedItem.Authors>
            <AuthorMetadata
              authors={article.authors}
              date={prettyDate(article.date)}
            />
          </FeaturedItem.Authors>
        </FeaturedItem.Root>
      </SectionContainer>
      <div>
        <RichText value={article.content.content} />
      </div>
    </>
  )
}