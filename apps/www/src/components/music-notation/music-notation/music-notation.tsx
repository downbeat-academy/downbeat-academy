import classnames from 'classnames'
import { buildFileUrl, getFile } from '@sanity/asset-utils'
import { sanityConfig } from '@lib/sanity/sanity.config'
import { toKebabCase } from '@utils/stringFormat'
import { Tabs, TabsList, TabsTrigger, TabsContent, Text } from 'cadence-core'
import { SectionContainer } from '@components/section-container'
import { SectionTitle } from '@components/section-title'
import { OpenSheetMusicDisplay } from './open-sheet-music-display'
import s from './music-notation.module.css'

import type { MusicNotationProps } from './types'

const MusicNotation = ({
	files,
	title,
	description,
	collapse,
	className,
}: MusicNotationProps) => {
	const classes = classnames([
		s.root,
		{
			[s.collapse]: collapse,
		},
		className,
	])

	const renderTriggers = files.map((file, index) => {
		const label = toKebabCase(file.label || `file-${index}`)

		return (
			<TabsTrigger value={label} key={label}>
				{file.label || `File ${index + 1}`}
			</TabsTrigger>
		)
	})

	const renderContent = files.map((file, index) => {
		// Get the file asset information from Sanity
		const fileData = getFile(file.asset, sanityConfig)
		const label = toKebabCase(file.label || `file-${index}`)

		return (
			<TabsContent
				value={label}
				padding="large"
				background="primary"
				key={label}
			>
				<OpenSheetMusicDisplay
					file={buildFileUrl(fileData.asset, sanityConfig)}
				/>
			</TabsContent>
		)
	})

	return (
		<SectionContainer className={classes}>
			{title && (
				<SectionTitle
					title={
						<Text tag="h5" type="productive-body" size="body-large" collapse>
							{title}
						</Text>
					}
					subtitle={
						description && (
							<Text tag="p" type="productive-body" size="body-base">
								{description}
							</Text>
						)
					}
				/>
			)}
			<Tabs
				defaultValue={toKebabCase(files[0]?.label || 'file-0')}
				className={s.content}
			>
				<TabsList>{renderTriggers}</TabsList>
				{renderContent}
			</Tabs>
		</SectionContainer>
	)
}

export { MusicNotation }
