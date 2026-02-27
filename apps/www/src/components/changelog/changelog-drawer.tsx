'use client'

import {
	Badge,
	Text,
	Flex,
	Separator,
	Drawer,
	DrawerContent,
	DrawerTrigger,
	DrawerHeader,
	DrawerBody,
	DrawerTitle,
	DrawerDescription,
} from 'cadence-core'
import { prettyDate } from '@utils/dateFormat'
import s from './changelog-drawer.module.css'

import type { ChangelogEntry } from '../../types/changelog'

interface ChangelogDrawerProps {
	changelog: ChangelogEntry[]
}

const ChangelogDrawer = ({ changelog }: ChangelogDrawerProps) => {
	if (!changelog || changelog.length === 0) {
		return null
	}

	const latestDate = changelog[0].date

	return (
		<Drawer>
			<DrawerTrigger asChild>
				<button className={s.trigger} aria-label="View changelog">
					<Badge
						text={`Updated ${prettyDate(latestDate, 'MMM d, yyyy')}`}
						type="info"
						style="light"
						size="small"
					/>
				</button>
			</DrawerTrigger>
			<DrawerContent side="right">
				<DrawerHeader>
					<DrawerTitle>Changelog</DrawerTitle>
					<DrawerDescription>
						A history of meaningful updates to this content.
					</DrawerDescription>
				</DrawerHeader>
				<DrawerBody>
					<Flex tag="div" direction="column" gap="large" className={s.list}>
						{changelog.map((entry, index) => (
							<div key={`${entry.date}-${index}`} className={s.entry}>
								<Text
									tag="p"
									type="productive-body"
									size="body-small"
									color="faint"
									collapse
								>
									{prettyDate(entry.date)}
								</Text>
								<Text
									tag="p"
									type="productive-body"
									size="body-base"
									color="high-contrast"
									collapse
								>
									{entry.summary}
								</Text>
								{entry.description && (
									<Text
										tag="p"
										type="productive-body"
										size="body-small"
										color="primary"
										collapse
									>
										{entry.description}
									</Text>
								)}
								{index < changelog.length - 1 && <Separator />}
							</div>
						))}
					</Flex>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	)
}

export { ChangelogDrawer }
