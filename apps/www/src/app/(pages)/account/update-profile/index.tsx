import { Flex } from 'cadence-core'
import { Text } from 'cadence-core'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@components/dialog'
import { Button, ButtonWrapper } from '@components/button'

import { UpdateProfileForm } from './update-profile-form'

interface ProfileSettingsProps {
	name: string
	email: string
}

const ProfileSettings = ({ name, email }: ProfileSettingsProps) => {
	return (
		<Flex direction="column" tag="article" gap="medium">
			<Text tag="h2" size="h4" type="expressive-headline" collapse>
				Profile settings
			</Text>
			<UpdateProfileForm
				isReadOnly={true}
				name={name}
				email={email}
			/>
			<ButtonWrapper>
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="primary" size="medium" text="Update profile" />
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Update profile</DialogTitle>
						</DialogHeader>
						<UpdateProfileForm isReadOnly={false} />
					</DialogContent>
				</Dialog>
			</ButtonWrapper>
		</Flex>
	)
}

export { ProfileSettings }
