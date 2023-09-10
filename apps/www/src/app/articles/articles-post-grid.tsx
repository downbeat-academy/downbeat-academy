import { sanityClient } from "@lib/sanity.client"
import { articlesPageQuery } from '@lib/queries';
import { linkResolver } from '@utils/linkResolver'
import { getSanityImageUrl } from '@utils/getSanityImage';
import { truncateString } from '@utils/truncateString'

import * as Card from '@components/card'
import { Text } from '@components/text'
import { Grid } from '@components/grid'
import { Link } from '@components/link'
import { AuthorMetadata } from '@components/author';
import { prettyDate } from '@utils/dateFormat';

async function getArticles() {
  const res = sanityClient.fetch(articlesPageQuery)

  if (!res) {
    throw new Error('Failed to fetch data.');
  }

  return res;
}

export default async function ArticlesPostGrid() {
  const articles = await getArticles()

  const mapArticles = articles.map(article => {
    return (
      <Card.Root
        borderColor='faint'
        key={article._id}
      >
        <Card.Image
          image={getSanityImageUrl(article.featuredImage.image.asset).url()}
          alt={article.featuredImage.alternativeText}
          url={linkResolver(article.slug, 'article')}
        />
        <Card.Content>
          <Link href={linkResolver(article.slug, 'article')} type='inherit'>
            <Text type='expressive-headline' size='h4' collapse>{article.title}</Text>
          </Link>
          <Text
            type='expressive-body'
            size='body-small'
            collapse
          >
            {truncateString(article.excerpt, 180)}
          </Text>
          <AuthorMetadata
            authors={article.authors}
            avatarSize='small'
            date={prettyDate(article.date)}
          />
        </Card.Content>
      </Card.Root>
    )
  })

  return (
    <Grid columns={3}>
      {mapArticles}
    </Grid>
  )
}

export { ArticlesPostGrid }