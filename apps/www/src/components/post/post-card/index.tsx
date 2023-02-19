import Link from 'next/link'
import Image from 'next/image'
import { Flex, Text } from 'cadence-core'
import { getSanityImageUrl } from '@utils/getSanityImage'
import { linkResolver } from '@utils/linkResolver'
import { ContentAuthor } from '@components/content-author'
import { PostCardProps } from './types'
import s from './postCard.module.scss'

const PostCard = ({ image, title, slug, authors, date, excerpt }: PostCardProps) => {
	const imageUrl = getSanityImageUrl(image.image.asset)

	return (
			<article className={s.wrapper}>
				<Link href={linkResolver(slug, 'article')} className={s.imageWrapper}>
					<Image
						src={imageUrl}
						alt={image.alternativeText}
						fill
						style={{ objectFit: 'cover' }}
						sizes="(max-width: 1440px) 500px,
									(max-width: 1000px) 400px,
									375px"
					/>
				</Link>
				<Flex
					direction="column"
					gap="base"
					padding="medium"
					className={s.mainContent}
				>
					<Link href={linkResolver(slug, 'article')}>
						<Text
							tag="h4"
							category="headline"
							type="expressive"
							color="primary"
							size="large"
							collapse
						>
							{title}
						</Text>
					</Link>
					{excerpt &&
						<Text
							tag="p"
							category="body"
							type="expressive"
							color="primary"
							size="base"
							collapse
						>
							{excerpt}
						</Text>
					}
					<ContentAuthor
						authors={authors}
						date={date}
						avatarSize='small'
					/>
				</Flex>
			</article>
	)
}

export { PostCard }
