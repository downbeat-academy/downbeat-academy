import Image from 'next/image'
import Link from 'next/link'
import { Flex, Text } from 'cadence-react'
import { getSanityImageUrl } from '@utils/getSanityImage'
import { linkResolver } from '@utils/linkResolver'
import { ContentAuthor } from '@components/content-author'
import { FeaturedPostProps } from './types'
import s from './featuredPost.module.scss'
import { Categories } from './Categories'

const FeaturedPost = ({ input }: FeaturedPostProps) => {
	const { slug, categories, title, excerpt, authors, date, featuredImage, updatedDate } =
		input

	const imageUrl = getSanityImageUrl(featuredImage.image.asset)

	return (
		<section className={s.wrapper}>
			<div className={s.image}>
				<Image
					src={imageUrl}
					alt={featuredImage.alternativeText ? featuredImage.alternativeText : 'Featured image'}
					fill
					style={{ objectFit: 'cover' }}
					priority
					sizes="(max-width: 900px) 100vw,
                (max-width: 500) 50vw"
				/>
			</div>
			<aside className={s.content}>
				<Flex direction="column" gap="base" className={s.main}>
					<Flex direction="row" gap="small">
						<Categories categories={categories} />
					</Flex>
					<Link href={linkResolver(slug, 'article')} className={s.title}>
						<Text
							tag="h1"
							size="5x-large"
							type="expressive"
							category="headline"
							collapse={true}
						>
							{title}
						</Text>
					</Link>
					<Text
						tag="p"
						size="large"
						type="expressive"
						category="body"
						collapse={true}
						color="primary"
					>
						{excerpt}
					</Text>
				</Flex>
				<div className={s.divider} aria-hidden="true"></div>
				<div className={s.author}>
					<ContentAuthor
						authors={authors}
						date={date}
						updatedDate={updatedDate}
						avatarSize='medium'
					/>
				</div>
			</aside>
		</section>
	)
}

export { FeaturedPost }
