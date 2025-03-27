import Img from 'next/image'
import { Link } from '@components/link'
import s from './image.module.css'

import type { FeaturedItemImageProps } from './types'

const FeaturedItemImage = ({ image, alt, url }: FeaturedItemImageProps) => {
	return (
		<aside className={s.root}>
			{url ? (
				<Link href={url}>
					<Img
						src={image}
						alt={alt}
						fill={true}
						sizes="(max-width: 768px) 80vw, (max-width: 1200px) 60vw"
						priority
					/>
				</Link>
			) : (
				<Img src={image} alt={alt} fill={true} priority />
			)}
		</aside>
	)
}

FeaturedItemImage.displayName = 'FeaturedItemImage'

const Image = FeaturedItemImage

export { FeaturedItemImage, Image }
export type { FeaturedItemImageProps }
