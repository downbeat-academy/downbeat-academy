import Image from 'next/image'
import Link from 'next/link'
import { Text, Avatar, Badge, Flex } from 'cadence-react'
import { getSanityImageUrl } from '@utils/getSanityImage'
import { linkResolver } from '@utils/linkResolver'
import { ContentGrid, ContentGridItem } from '@components/layout'
import { RichText } from '@components/content-modules'
import { StyledLink } from '@components/link'
import { ContributorTemplateProps } from './types'
import s from './contributorTemplateProps.module.scss'

const ContributorTemplate = ({
  name,
  avatar,
  biography,
  instrument,
  content
}: ContributorTemplateProps) => {

  const instruments = instrument.map(instrument => {
    return <Badge type='neutral' style='outline' text={instrument} key={instrument} />
  })

  const contributorContent = content.map(content => {
    return (
      <StyledLink
        href={linkResolver(content.slug, content.type)}
        style='default'
        type='primary'
        key={content.title}
      >{content.title}</StyledLink>
    )
  })

  const image = (
    <Image
      src={getSanityImageUrl(avatar.image.asset)}
      alt={avatar.alternativeText}
      width={400}
      height={400}
    />
  )
  return (
    <ContentGrid>
      <ContentGridItem location='center' padding='small'>
        <Avatar
          imageObject={image}
          size='large'
        />
        <Text
          tag='h1'
          size='5x-large'
          category='headline'
          type='expressive'
        >{name}</Text>
        <Flex direction='row' gap='small'>{instruments}</Flex>
        <RichText value={biography.content} />
        <Flex direction='column' gap='base'>
          <Text
            type='expressive'
            tag='h3'
            size='4x-large'
            category='headline'
          >Content</Text>
          {contributorContent}
        </Flex>
      </ContentGridItem>
    </ContentGrid>
  )
}

export { ContributorTemplate }