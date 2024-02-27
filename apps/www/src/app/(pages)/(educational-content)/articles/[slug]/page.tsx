import { sanityClient } from "@lib/sanity/sanity.client";
import { articlesBySlugQuery, articlePaths } from "@lib/queries";
import { getSanityImageUrl } from "@utils/getSanityImage";
import { prettyDate } from "@utils/dateFormat";
import { linkResolver } from "@utils/linkResolver";
import { getOgTitle } from "@utils/metaHelpers";
import { Text } from '@components/text'
import { SectionContainer } from "@components/section-container";
import * as FeaturedItem from "@components/featured-item";
import { AuthorMetadata } from "@components/author";
import { RichText, RichTextWrapper } from "@components/rich-text";
import { Badge } from "@components/badge";
import { Link } from "@components/link";
import { Flex } from "@components/flex";

import type { Metadata, ResolvingMetadata } from 'next'
import type { MetaProps } from '../../../../types/meta'

const client = sanityClient

// Generate metadata
export async function generateMetadata(
  { params }: MetaProps,
  parent: ResolvingMetadata
): Promise<Metadata> {

  const { slug } = params;

  try {
    const article = await client.fetch(articlesBySlugQuery, {
      slug
    })

    return {
      title: getOgTitle(article.metadata.title),
      description: article.metadata.description,
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

// Generate the slugs/routes for the articles
export async function generateStaticParams() {

  try {
    const slugs = await sanityClient.fetch(
      articlePaths,
      {
        next: {
          revalidate: 60,
        }
      }
    )
    return slugs.map((slug) => ({ slug }));
  } catch (error) {
    console.error(error)
    throw error
  }
}

// Render the article data
export default async function ArticleSlugRoute({ params }) {
  const { slug } = params

  try {
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
        <Link href={linkResolver(category.slug, 'category')} key={category.title}>
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
  } catch (error) {
    console.error(error)
    throw error
  }
}