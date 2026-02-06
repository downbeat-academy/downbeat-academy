import React from 'react'
import BoringAvatar from 'boring-avatars'
import classnames from 'classnames'
import s from './avatar.module.css'

import type { AvatarProps } from './types'

const sizeMap: Record<string, number> = {
  small: 40,
  medium: 64,
  large: 80,
}

const placeholderColors = ['#6b75f6', '#43a2ff', '#b10010', '#4ccad1']

const Avatar = ({
  imageObject,
  imageUrl,
  name,
  size = 'medium',
  className,
}: AvatarProps) => {
  const classes = classnames(s.root, s[`size--${size}`], className)

  return (
    <div className={classes} data-cy="cds-avatar">
      {imageObject === undefined && imageUrl === undefined ? (
        <BoringAvatar
          name={name}
          variant="beam"
          square={true}
          size={sizeMap[size]}
          colors={placeholderColors}
        />
      ) : imageObject !== undefined && imageUrl === undefined ? (
        imageObject
      ) : imageObject === undefined && imageUrl !== undefined ? (
        <img src={imageUrl} alt={name} />
      ) : null}
    </div>
  )
}

export { Avatar }
export type { AvatarProps }
