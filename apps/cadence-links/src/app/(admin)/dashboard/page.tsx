'use client'

import { useState, useEffect, useCallback } from 'react'
import { Text, Flex } from 'cadence-core'
import { AppHeader } from '@components/layout/app-header'
import { LinkForm } from '@components/link-form'
import { LinksTable } from '@components/links-table'
import { SuccessMessage } from '@components/success-message'
import type { Link, CreateLinkResponse, GetLinksResponse, ErrorResponse } from '@/types/link'
import styles from './dashboard.module.css'

export default function DashboardPage() {
	const [links, setLinks] = useState<Link[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [successData, setSuccessData] = useState<{ shortUrl: string } | null>(null)

	const fetchLinks = useCallback(async () => {
		try {
			const response = await fetch('/api/links')
			const data = (await response.json()) as GetLinksResponse | ErrorResponse

			if (data.success) {
				setLinks(data.links)
			}
		} catch (error) {
			console.error('Failed to fetch links:', error)
		} finally {
			setIsLoading(false)
		}
	}, [])

	useEffect(() => {
		fetchLinks()
	}, [fetchLinks])

	const handleSuccess = (response: CreateLinkResponse) => {
		setSuccessData({ shortUrl: response.shortUrl })
		// Add the new link to the top of the list
		setLinks((prev) => [response.link, ...prev])
	}

	const handleDismissSuccess = () => {
		setSuccessData(null)
	}

	const handleDelete = async (id: string) => {
		try {
			const response = await fetch(`/api/links/${id}`, {
				method: 'DELETE',
			})

			const data = await response.json()

			if (data.success) {
				setLinks((prev) => prev.filter((link) => link.id !== id))
			}
		} catch (error) {
			console.error('Failed to delete link:', error)
		}
	}

	return (
		<div className={styles.container}>
			<AppHeader />

			<main className={styles.main}>
				<div className={styles.content}>
					<Flex direction="column" gap="large">
						<section>
							<Text
								size='h2'
								tag="h2"
								type='productive-headline'
								className={styles.sectionTitle}
							>
								Create Short Link
							</Text>
							<LinkForm onSuccess={handleSuccess} />
						</section>

						{successData && (
							<SuccessMessage
								shortUrl={successData.shortUrl}
								onDismiss={handleDismissSuccess}
							/>
						)}

						<section>
							<Text size='h2' tag="h2" className={styles.sectionTitle}>
								All Links
							</Text>
							{isLoading ? (
								<Text size='body-base' tag='p' color="faint">
									Loading links...
								</Text>
							) : (
								<LinksTable links={links} onDelete={handleDelete} />
							)}
						</section>
					</Flex>
				</div>
			</main>
		</div>
	)
}
