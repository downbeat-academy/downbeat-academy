import Image from 'next/image'
import classnames from 'classnames'
import { Text } from 'cadence-core'
import { Avatar, AvatarGroup } from '@components/avatar'
import { Link } from '@components/link'
import { Flex } from 'cadence-core'
import { getSanityImageUrl } from '@utils/getSanityImage'
import { linkResolver } from '@utils/link-resolver'

import type { AuthorMetadataProps } from './types'

const AuthorMetadata = ({
	authors,
	avatarSize = 'medium',
	children,
	className,
	date,
}: AuthorMetadataProps) => {
	const classes = classnames(className)

	const mapAuthorImages = authors?.map((authorImage) => {
		if (!authorImage.slug || !authorImage.name) return null
		
		// Handle the nested image structure from Sanity
		let imageUrl: string | undefined = undefined
		
		if (authorImage.image) {
			// Check if it's the nested structure (image.image.asset)
			if (authorImage.image.image?.asset) {
				imageUrl = getSanityImageUrl(authorImage.image.image.asset).url()
			}
			// Check if it's the direct structure (image.asset)
			else if (authorImage.image.asset) {
				imageUrl = getSanityImageUrl(authorImage.image.asset).url()
			}
			// Check if it's already a Sanity image object that can be passed directly
			else if (authorImage.image._type === 'image' || authorImage.image._ref) {
				imageUrl = getSanityImageUrl(authorImage.image).url()
			}
		}
		
		return (
			<Link
				href={linkResolver(authorImage.slug, 'contributor')}
				key={authorImage.name}
			>
				<Avatar
					imageUrl={imageUrl}
					name={authorImage.name}
					size={avatarSize}
				/>
			</Link>
		)
	})

	const renderAuthorNames = () => {
		if (!authors || authors.length === 0) return null
		
		const validAuthors = authors.filter(author => author.slug && author.name)
		if (validAuthors.length === 0) return null
		
		// Handle different cases for natural language formatting
		if (validAuthors.length === 1) {
			return (
				<Link
					type="secondary"
					href={linkResolver(validAuthors[0].slug!, 'contributor')}
				>
					<strong>{validAuthors[0].name}</strong>
				</Link>
			)
		} else if (validAuthors.length === 2) {
			return (
				<>
					<Link
						type="secondary"
						href={linkResolver(validAuthors[0].slug!, 'contributor')}
					>
						<strong>{validAuthors[0].name}</strong>
					</Link>
					{' and '}
					<Link
						type="secondary"
						href={linkResolver(validAuthors[1].slug!, 'contributor')}
					>
						<strong>{validAuthors[1].name}</strong>
					</Link>
				</>
			)
		} else if (validAuthors.length === 3) {
			return (
				<>
					<Link
						type="secondary"
						href={linkResolver(validAuthors[0].slug!, 'contributor')}
					>
						<strong>{validAuthors[0].name}</strong>
					</Link>
					{', '}
					<Link
						type="secondary"
						href={linkResolver(validAuthors[1].slug!, 'contributor')}
					>
						<strong>{validAuthors[1].name}</strong>
					</Link>
					{', and '}
					<Link
						type="secondary"
						href={linkResolver(validAuthors[2].slug!, 'contributor')}
					>
						<strong>{validAuthors[2].name}</strong>
					</Link>
				</>
			)
		} else {
			// More than 3 authors
			const additionalCount = validAuthors.length - 3
			return (
				<>
					<Link
						type="secondary"
						href={linkResolver(validAuthors[0].slug!, 'contributor')}
					>
						<strong>{validAuthors[0].name}</strong>
					</Link>
					{', '}
					<Link
						type="secondary"
						href={linkResolver(validAuthors[1].slug!, 'contributor')}
					>
						<strong>{validAuthors[1].name}</strong>
					</Link>
					{', '}
					<Link
						type="secondary"
						href={linkResolver(validAuthors[2].slug!, 'contributor')}
					>
						<strong>{validAuthors[2].name}</strong>
					</Link>
					{`, and ${additionalCount} more`}
				</>
			)
		}
	}

	return (
		<Flex tag="div" direction="column" gap="medium" className={classes}>
			<Flex tag="div" direction="row" gap="medium">
				<AvatarGroup spacing="overlap-large">{mapAuthorImages}</AvatarGroup>
				<Flex
					tag="div"
					direction="column"
					justifyContent="center"
					gap="2x-small"
				>
					<Text tag="p" type="productive-body" size="body-small" collapse>
						{renderAuthorNames()}
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
