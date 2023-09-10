import Img from 'next/image'
import { sanityClient } from '@lib/sanity.client'
import { contributorsPageQuery } from '@lib/queries'
import { linkResolver } from '@utils/linkResolver'
import { getSanityImageUrl } from '@utils/getSanityImage'

import * as Card from '@components/card'
import { Text } from '@components/text'
import { Grid } from '@components/grid'
import { Link } from '@components/link'
import { Flex } from '@components/flex'
import { Avatar } from '@components/avatar'
import { Badge } from '@components/badge'

async function getContributors() {
  const res = sanityClient.fetch(contributorsPageQuery)

  if (!res) {
    throw new Error('Failed to fetch data.')
  }

  return res;
}

export default async function ContributorsGrid() {
  const contributors = await getContributors()

  const mapContributors = contributors.map(contributor => {
    return (
      <Card.Root
        borderColor='primary'
        key={contributor._id}
      >
        <Card.Content>
          <Flex
            direction='row'
            alignItems='center'
            gap='medium'
          >
            <Link href={linkResolver(contributor.slug, 'contributor')}>
              <Avatar
                name={contributor.name}
                size='large'
                imageObject={
                  <Img
                    src={getSanityImageUrl(contributor.avatar.image.asset).url()}
                    alt={contributor.name}
                    width={80}
                    height={80}
                  />
                }
              />
            </Link>
            <Flex direction='column' gap='medium'>
              <Text
                tag='p'
                size='h5'
                type='expressive-headline'
                color='strong'
                collapse
              >
                <Link href={linkResolver(contributor.slug, 'contributor')} type='inherit'>
                  {contributor.name}
                </Link>
              </Text>
              <Flex direction='row' gap='x-small'>
                {contributor.instrument.map(instrument => {
                  return <Badge style='outlined' size='small' text={instrument} key={instrument} />
                })}
              </Flex>
            </Flex>
          </Flex>
        </Card.Content>
      </Card.Root>
    )
  })

  return (
    <Grid columns={3}>
      {mapContributors}
    </Grid>
  )
}

export { ContributorsGrid }