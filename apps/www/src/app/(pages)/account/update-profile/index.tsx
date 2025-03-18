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

const ProfileSettings = ({ name }: { name: string }) => {
	return (
		<Flex direction="column" tag="article" gap="medium">
			<Text tag="h2" size="h4" type="expressive-headline" collapse>
				Profile settings
			</Text>
			<UpdateProfileForm
				isReadOnly={true}
				name={name}
			/>
			<ButtonWrapper>
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="primary" size="medium" text="Update name" />
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Update name</DialogTitle>
						</DialogHeader>
						<UpdateProfileForm isReadOnly={false} />
					</DialogContent>
				</Dialog>
			</ButtonWrapper>
		</Flex>
	)
}

export { ProfileSettings }
