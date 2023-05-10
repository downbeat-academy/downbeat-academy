import Image from 'next/image'
import Link from 'next/link'
import { Avatar, Text, Flex, Badge } from 'cadence-react'
import { getSanityImageUrl } from '@utils/getSanityImage'
import { linkResolver } from '@utils/linkResolver'
import s from './contributorItem.module.scss'

const ContributorItem = ({
  name,
  slug,
  avatar,
  instrument
}) => {

  const avatarImage = (
    <Image
      src={getSanityImageUrl(avatar.image)}
      width={400}
      height={400}
      alt={avatar.alternativeText}
    />
  )

  const getInstruments = instrument.map(instrument => {
    return <Badge text={instrument} key={instrument} style='outline' />
  })

  return (
    <Link href={linkResolver(slug, 'contributor')} className={s.root}>
      <Flex direction='row'>
        <Avatar imageObject={avatarImage} size='large' />
        <Flex direction='column'>
          <Text category='headline' tag='h4' type='expressive' size='3x-large' collapse>{name}</Text>
          <Flex direction='row' gap='small'>{getInstruments}</Flex>
        </Flex>
      </Flex>
    </Link>
  )
}

export { ContributorItem }