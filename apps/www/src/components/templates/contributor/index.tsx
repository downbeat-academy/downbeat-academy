import Image from 'next/image'
import { Text, Avatar } from 'cadence-core'
import { getSanityImageUrl } from '@utils/getSanityImage'
import { ContentGrid, ContentGridItem } from '@components/layout'
import { RichText } from '@components/content-modules'
import { ContributorTemplateProps } from './types'
import s from './contributorTemplateProps.module.scss'

const ContributorTemplate = ({
  name,
  avatar,
  biography,
  instrument,
  slug,
  content
}: ContributorTemplateProps) => {

  console.log(content)

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
      <ContentGridItem location='center' padding='large'>
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
        <RichText value={biography.content} />
      </ContentGridItem>
    </ContentGrid>
  )
}

export { ContributorTemplate }