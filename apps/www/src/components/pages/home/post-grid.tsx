import { linkResolver } from 'utils/linkResolver'
import { getSanityImageUrl } from 'utils/getSanityImage';
import { truncateString } from 'utils/truncateString'

import * as Card from 'components/card'
import { Text } from 'components/text'
import { Grid } from 'components/grid'
import { Link } from 'components/link'
import { AuthorMetadata } from 'components/author';
import { prettyDate } from 'utils/dateFormat';

export default async function HomePostGrid({ posts }) {

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