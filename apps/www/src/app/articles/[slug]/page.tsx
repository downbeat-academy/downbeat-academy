import { sanityClient } from "@lib/sanity.client";
import { articlesBySlugQuery, articlePaths } from "@lib/queries";
import { getSanityImageUrl } from "@utils/getSanityImage";
import { prettyDate } from "@utils/dateFormat";
import { linkResolver } from "@utils/linkResolver";
import { Text } from '@components/text'
import { SectionContainer } from "@components/section-container";
import * as FeaturedItem from "@components/featured-item";
import { AuthorMetadata } from "@components/author";
import { RichText, RichTextWrapper } from "@components/rich-text";
import { Badge } from "@components/badge";
import { Link } from "@components/link";
import { Flex } from "@components/flex";

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

  const renderCategories = article.categories.map(category => {
    return (
      <Link href={linkResolver(category.slug, 'category')} key={category.name}>
        <Badge type='neutral' style='filled' text={category.title} />
      </Link>
    )
  })

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
          <FeaturedItem.Description>
            <AuthorMetadata
              authors={article.authors}
              date={prettyDate(article.date)}
            >
              <Flex tag='div' direction='row' gap='medium'>
                {renderCategories}
              </Flex>
            </AuthorMetadata>
          </FeaturedItem.Description>
        </FeaturedItem.Root>
      </SectionContainer>
      <RichTextWrapper>
        <RichText value={article.content.content} />
      </RichTextWrapper>
    </>
  )
}