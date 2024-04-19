import Img from 'next/image'
import classnames from 'classnames'
import { getSanityImageUrl } from '@utils/getSanityImage'
import { Text } from '@components/text'
import s from './main-image.module.scss'

import type { MainImageProps } from './types'

const MainImage = ({
  image,
  altText,
  caption,
  collapse,
  className,
}: MainImageProps) => {

  const classes = classnames([
    s.root,
    {
      [s.collapse]: collapse,
    },
    className,
  ])


  return (
    <section className={classes}>
      <Img
        src={getSanityImageUrl(image).url()}
        alt={altText}
        fill={true}
      />
      <aside className={s[`caption-wrapper`]}>
        <Text
          tag='span'
          type='productive-body'
          color='primary'
        >{caption}</Text>
      </aside>
    </section>
  )
}

export { MainImage }
export type { MainImageProps }