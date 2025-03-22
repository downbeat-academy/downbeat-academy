import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth/auth'
import { SectionContainer } from '@components/section-container'
import { SectionTitle } from '@components/section-title'
import { Text } from 'cadence-core'
import { Flex } from 'cadence-core'
import { Separator } from '@components/separator'
import { ProfileSettings } from './update-profile'

export default async function AccountPage() {
	const session = await auth.api.getSession({
		headers: await headers()
	})

	if (!session?.session) {
		redirect('/sign-in')
	}
	const { session: sessionData, user } = session

	return (
		<SectionContainer>
			<SectionTitle
				title={
					<Text type="expressive-headline" size="h1" color="brand" collapse>
						Account
					</Text>
				}
				background="primary"
			/>
			<Flex direction="column" gap="3x-large" padding="x-large" tag="section">
				<Text
					tag="p"
					type="expressive-body"
					size="body-base"
					color="primary"
					collapse
				>
					We&apos;re working on new account features, check back soon to get the
					latest updates.
				</Text>
				<Separator />
				<ProfileSettings name={user.name} email={user.email} />
			</Flex>
		</SectionContainer>
	)
}
