import Img from 'next/image'
import { Link } from '@components/link'
import s from './image.module.scss'

import type { FeaturedItemImageProps } from './types'

const FeaturedItemImage = ({
  image,
  alt,
  url,
}: FeaturedItemImageProps) => {
  return (
    <aside className={s.root}>
      <Link href={url}>
        <Img
          src={image}
          alt={alt}
          fill={true}
        />
      </Link>
    </aside>
  )
}

FeaturedItemImage.displayName = 'FeaturedItemImage'

const Image = FeaturedItemImage;

export { FeaturedItemImage, Image }
export type { FeaturedItemImageProps }