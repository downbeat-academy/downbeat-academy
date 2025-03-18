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

import { UpdateEmailForm } from './update-email-form'

const EmailSettings = ({ email }: { email: string }) => {
	return (
		<Flex direction="column" tag="article" gap="medium">
			<Text tag="h2" size="h4" type="expressive-headline" collapse>
				Email settings
			</Text>
			<UpdateEmailForm
				isReadOnly={true}
				email={email}
			/>
			<ButtonWrapper>
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="primary" size="medium" text="Update email" />
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Update email</DialogTitle>
						</DialogHeader>
						<UpdateEmailForm isReadOnly={false} />
					</DialogContent>
				</Dialog>
			</ButtonWrapper>
		</Flex>
	)
}

export { EmailSettings } 