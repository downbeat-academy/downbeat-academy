import { draftMode } from 'next/headers'
import { readToken } from "@lib/sanity.api"
import { getClient } from "@lib/sanity.client"
import { homepagePostsQuery } from '@lib/queries';
import { linkResolver } from '@utils/linkResolver'
import { getSanityImageUrl } from '@utils/getSanityImage';
import { truncateString } from '@utils/truncateString'

import * as Card from '@components/card'
import { Text } from '@components/text'
import { Grid } from '@components/grid'
import { Link } from '@components/link'
import { AuthorMetadata } from '@components/author';
import { prettyDate } from '@app/utils/dateFormat';

// Get the post data
async function getHomepagePosts() {
  const preview = draftMode().isEnabled ? { token: readToken! } : undefined;
  const client = getClient(preview)
  const res = client.fetch(homepagePostsQuery)

  if (!res) {
    throw new Error('Failed to fetch data.');
  }

  return res;
}

export default async function HomePostGrid() {

  const data = await getHomepagePosts();
  const posts = data.slice(1, -1)

  const mapPosts = posts.map(post => {
    return (
      <Card.Root
        borderColor='faint'
        key={post._id}
      >
        <Card.Image
          image={getSanityImageUrl(post.featuredImage.image.asset).url()}
          alt={post.featuredImage.alternativeText}
          url={linkResolver(post.slug, 'article')}
        />
        <Card.Content>
          <Link href={linkResolver(post.slug, 'article')} type='inherit'>
            <Text type='expressive-headline' size='h4' collapse>{post.title}</Text>
          </Link>
          <Text
            type='expressive-body'
            size='body-small'
            collapse
          >
            {truncateString(post.excerpt, 180)}
          </Text>
          <AuthorMetadata
            authors={post.authors}
            avatarSize='small'
            date={prettyDate(post.date)}
          />
        </Card.Content>
      </Card.Root>
    )
  })

  return (
    <Grid columns={3}>
      {mapPosts}
    </Grid>
  )
}

export { HomePostGrid }