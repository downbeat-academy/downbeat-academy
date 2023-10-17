import Image from 'next/image'
import BoringAvatar from 'boring-avatars'
import classnames from 'classnames'
import s from './avatar.module.scss'

import type { AvatarProps } from './types'

const Avatar = ({
  imageObject,
  imageUrl,
  name,
  size = 'medium',
  className,
}: AvatarProps) => {

  const classes = classnames([
    s.root,
    s[`size--${size}`],
    className,
  ])

  const placeholderColors = ['#6b75f6', '#43a2ff', '#b10010', '#4ccad1']

  const getSize = (size: string) => {
    switch (size) {
      case 'small': return 40;
      case 'medium': return 64;
      case 'large': return 80;
    }
  }

  return (
    <div className={classes}>
      {imageObject === undefined && imageUrl === undefined ? (
        <BoringAvatar
          name={name}
          variant='beam'
          square={true}
          size={getSize(size)}
          colors={placeholderColors}
        />
      ) : imageObject !== undefined && imageUrl === undefined ? (
        imageObject
      ) : imageObject === undefined && imageUrl !== undefined ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageUrl} alt={name} />
      ) : null}
    </div>
  )
}

export { Avatar }
export type { AvatarProps }