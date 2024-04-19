import Img from 'next/image'
import { Link } from 'components/link'
import s from './image.module.scss'

import type { CardImageProps } from './types'

const CardImage = ({
  image,
  alt,
  url,
}: CardImageProps) => {
  return (
    <div className={s.root}>
      <Link href={url}>
        <Img
          src={image}
          alt={alt}
          fill={true}
          sizes="(max-width: 500px) 90vw, (max-width: 1200px) 30vw"
        />
      </Link>
    </div>
  )
}

CardImage.displayName = 'CardImage';

const Image = CardImage;

export { CardImage, Image }
export type { CardImageProps }