import React from 'react'
import s from './image.module.css'

import type { CardImageProps } from './types'

const CardImage = ({ image, alt, url, children }: CardImageProps & { children?: React.ReactNode }) => {
	return (
		<div className={s['root']}>
			{children || (
				<a href={url} className={s['link']}>
					<img
						src={image}
						alt={alt}
						className={s['img']}
					/>
				</a>
			)}
		</div>
	)
}

CardImage.displayName = 'CardImage'

const Image = CardImage

export { CardImage, Image }
export type { CardImageProps }