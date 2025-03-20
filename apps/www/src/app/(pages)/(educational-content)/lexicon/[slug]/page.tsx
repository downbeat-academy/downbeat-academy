import { sanityClient } from '@lib/sanity/sanity.client'
import { lexiconsBySlugQuery, lexiconPaths } from '@lib/queries'
import { getOgTitle } from '@utils/metaHelpers'
import { formatTime } from '@utils/format-time'
import { Text } from 'cadence-core'
import { SectionContainer } from '@components/section-container'
import { SectionTitle } from '@components/section-title'
import { RichText, RichTextWrapper } from '@components/rich-text'
import { Badge, Flex } from 'cadence-core'
import { MusicNotation } from '@components/music-notation'
import { AudioPlayer } from '@components/audio'

import s from './lexicon-page.module.scss'
import type { Metadata, ResolvingMetadata } from 'next'

type PageProps = {
	params: Promise<{ slug: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const client = sanityClient

// Generate metadata
export async function generateMetadata(props: PageProps, parent: ResolvingMetadata): Promise<Metadata> {
	const params = await props.params
	const { slug } = params

	try {
		const lexicon = await client.fetch(
			lexiconsBySlugQuery,
			{ slug },
			{
				next: {
					revalidate: 60,
				}
			}
		)

		return {
			title: getOgTitle(
				`${lexicon.artist} - ${lexicon.album} - ${lexicon.track} - ${formatTime(lexicon.timestamp).totalTime}`
			),
			description: lexicon.excerpt,
		}
	} catch (error) {
		console.error(error)
		throw error
	}
}

// Generate static params
export async function generateStaticParams() {
	try {
		const slugs = await sanityClient.fetch(
			lexiconPaths,
			{},
			{
				next: {
					revalidate: 60,
				}
			}
		)

		return slugs.map((slug) => ({ slug }))
	} catch (error) {
		console.error(error)
		throw error
	}
}

// Render the lexicon data
export default async function LexiconSlugRoute(props: PageProps) {
	const params = await props.params
	const { slug } = params

	try {
		const lexicon = await sanityClient.fetch(
			lexiconsBySlugQuery,
			{ slug },
			{
				next: {
					revalidate: 60,
				}
			}
		)

		const lexiconMetadata = [
			{
				title: 'Artist',
				value: lexicon.artist,
			},
			{
				title: 'Album',
				value: lexicon.album,
			},
			{
				title: 'Track',
				value: lexicon.track,
			},
			{
				title: 'Timestamp',
				value: formatTime(lexicon.timestamp).totalTime,
			},
			{
				title: 'Style',
				value: lexicon.style,
			},
			{
				title: 'Length',
				value: lexicon.length,
			},
			{
				title: 'Chord Progression',
				value: lexicon.chordProgression,
			},
		]

		const renderMetadata = lexiconMetadata.map((item) => {
			return (
				<Flex
					direction="column"
					alignItems="start"
					gap="2x-small"
					key={item.value}
				>
					<Text
						tag="p"
						type="productive-body"
						size="body-base"
						color="primary"
						collapse
					>
						{item.title}:
					</Text>
					<Badge text={item.value} type="neutral" size="large" />
				</Flex>
			)
		})

		return (
			<>
				<SectionContainer>
					<SectionTitle
						background="primary"
						title={
							<Text
								tag="h1"
								type="expressive-headline"
								size="h1"
								color="high-contrast"
								collapse
							>
								{lexicon.title}
							</Text>
						}
					/>
					<section className={s.excerpt}>
						<Flex
							direction="column"
							gap="medium"
							className={s['excerpt-content']}
						>
							<RichText value={lexicon.content.content} />
							<AudioPlayer tracks={lexicon.audio} showTitle={false} showArtist={false} />
							<MusicNotation files={lexicon.excerpt.files} collapse />
						</Flex>
					</section>
					<SectionTitle background="primary">
						<Flex direction="row" gap="large" justifyContent="space-between" wrap>
							{renderMetadata}
						</Flex>
					</SectionTitle>
				</SectionContainer>
			</>
		)
	} catch (error) {
		console.error(error)
		throw error
	}
}
