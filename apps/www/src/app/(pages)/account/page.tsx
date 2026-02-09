import { SectionContainer } from '@components/section-container'
import { SectionTitle } from '@components/section-title'
import { Text, Flex, Badge, Separator } from 'cadence-core'
import { ProfileSettings } from './update-profile'
import { showAdminRole } from './show-admin-role'
import { requireAuth } from '@/lib/auth/require-auth'

export default async function AccountPage() {
	const session = await requireAuth('/account')
	const { session: sessionData, user } = session

	return (
		<SectionContainer>
			<SectionTitle
				title={
					<Flex alignItems="center" gap="medium" direction="row">
						<Text type="expressive-headline" size="h1" color="brand" collapse>
							Account
						</Text>
						{showAdminRole(user)}
					</Flex>
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
