import classnames from 'classnames'
import { Text, Avatar, AvatarGroup, Flex } from 'cadence-core'
import { Link } from '@components/link'
import { getSanityImageUrl } from '@utils/getSanityImage'
import { linkResolver } from '@utils/link-resolver'

import type { AuthorMetadataProps } from './types'

/** Resolves various Sanity image structures to a URL */
function resolveImageUrl(image: any): string | undefined {
	if (!image) return undefined

	// Nested structure: image.image.asset
	if (image.image?.asset) {
		return getSanityImageUrl(image.image.asset).url()
	}
	// Direct structure: image.asset
	if (image.asset) {
		return getSanityImageUrl(image.asset).url()
	}
	// Raw Sanity image object
	if (image._type === 'image' || image._ref) {
		return getSanityImageUrl(image).url()
	}

	return undefined
}

/** Renders an author name as a link */
function AuthorLink({ slug, name }: { slug: string; name: string }) {
	return (
		<Link type="secondary" href={linkResolver(slug, 'contributor')}>
			<strong>{name}</strong>
		</Link>
	)
}

/** Joins an array of React nodes with proper grammar (commas and "and") */
function formatAuthorList(
	authors: Array<{ slug: string; name: string }>
): React.ReactNode {
	if (authors.length === 1) {
		return <AuthorLink slug={authors[0].slug} name={authors[0].name} />
	}

	if (authors.length === 2) {
		return (
			<>
				<AuthorLink slug={authors[0].slug} name={authors[0].name} />
				{' and '}
				<AuthorLink slug={authors[1].slug} name={authors[1].name} />
			</>
		)
	}

	// 3+ authors: show first 3 with Oxford comma
	const displayedAuthors = authors.slice(0, 3)
	const remainingCount = authors.length - 3

	return (
		<>
			{displayedAuthors.map((author, index) => {
				const isLast = index === displayedAuthors.length - 1

				return (
					<span key={author.slug}>
						{index > 0 && (isLast ? ', and ' : ', ')}
						<AuthorLink slug={author.slug} name={author.name} />
						{isLast && remainingCount > 0 && `, and ${remainingCount} more`}
					</span>
				)
			})}
		</>
	)
}

const AuthorMetadata = ({
	authors,
	avatarSize = 'medium',
	children,
	className,
	date,
}: AuthorMetadataProps) => {
	const classes = classnames(className)

	const validAuthors = authors?.filter(
		(author): author is typeof author & { slug: string; name: string } =>
			Boolean(author.slug && author.name)
	)

	const authorAvatars = validAuthors?.map((author) => (
		<Link
			href={linkResolver(author.slug, 'contributor')}
			key={author.name}
		>
			<Avatar
				imageUrl={resolveImageUrl(author.image)}
				name={author.name}
				size={avatarSize}
			/>
		</Link>
	))

	return (
		<Flex tag="div" direction="column" gap="medium" className={classes}>
			<Flex tag="div" direction="row" gap="medium">
				<AvatarGroup spacing="overlap-large">{authorAvatars}</AvatarGroup>
				<Flex
					tag="div"
					direction="column"
					justifyContent="center"
					gap="2x-small"
				>
					<Text tag="p" type="productive-body" size="body-small" collapse>
						{validAuthors && validAuthors.length > 0 && formatAuthorList(validAuthors)}
					</Text>
					<Text tag="p" type="productive-body" size="body-small" collapse>
						Published on {date}
					</Text>
				</Flex>
			</Flex>
			{children}
		</Flex>
	)
}

export { AuthorMetadata }
