'use client'

import {
	Button,
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
import { ChevronRight } from 'cadence-icons'
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
				<Button
					variant="ghost"
					size="small"
					icon={<ChevronRight />}
					iconPosition="trailing"
					aria-label="View changelog"
				>
					{`Updated ${prettyDate(latestDate, 'MMM d, yyyy')}`}
				</Button>
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
									color="strong"
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
