import Link from 'next/link'
import Image from 'next/image'
import { Avatar, AvatarGroup, Text } from 'cadence-core'
import { getSanityImageUrl } from '@utils/getSanityImage'
import { prettyDate } from '@utils/dateFormat'
import { linkResolver } from '@utils/linkResolver'
import s from '@styles/pages/homepage/featured-post/postMeta.module.scss'

const PostMeta = ({ authors, date }) => {
	const postDate = prettyDate(date, 'MMM do, yyyy')

	const getAuthorNames = authors.slice(0, 3).map((author) => {
		return (
			<Link
				href={linkResolver(author.slug, 'contributor')}
				key={author._id}
				className={s.authorLink}
			>
				{author.name}{' '}
			</Link>
		)
	})

	const getAuthorImages = authors.slice(0, 3).map((author) => {
		const image = (
			<Image
				src={getSanityImageUrl(author.avatar.image.asset)}
				alt={author.name}
				width={100}
				height={100}
			/>
		)

		return (
			<Link href={linkResolver(author.slug, 'contributor')} key={author._id}>
				<Avatar imageObject={image} />
			</Link>
		)
	})

	return (
		<div className={s.wrapper}>
			<AvatarGroup
				avatars={getAuthorImages}
				overlap={true}
				isInteractive={authors.length > 1 ? true : false}
			/>
			<div className={s.textWrapper}>
				<Text
					tag="p"
					size="small"
					category="body"
					type="productive"
					collapse={true}
					color="strong"
				>
					<strong>{getAuthorNames}</strong>
				</Text>
				<Text
					tag="p"
					size="small"
					category="body"
					type="productive"
					collapse={true}
					color="primary"
				>
					<strong>Published {postDate}</strong>
				</Text>
			</div>
		</div>
	)
}

export { PostMeta }
