import Img from 'next/image'
import { Link } from '@components/link'
import s from './image.module.scss'

import type { CardImageProps } from './types'

const CardImage = ({
  image,
  alt,
  url,
}: CardImageProps) => {
  <div className={s.root}>
    <Link href={url}>
      <Img
        src={image}
        alt={alt}
        fill={true}
      />
    </Link>
  </div>
}

CardImage.displayName = 'CardImage';

const Image = CardImage;

export { CardImage, Image }
export type { CardImageProps }