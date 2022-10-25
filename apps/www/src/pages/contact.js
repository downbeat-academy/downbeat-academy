import { useState } from 'react';
import {
	styled,
	Form,
	Input,
	TextArea,
	Label,
	Button,
	Flex,
	Paragraph,
} from 'cadence-design-system';
import { Seo } from '@components/meta';
import { ShowTitleWrapper } from '@components/content';

export default function Contact() {
	const [fullName, setFullName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');

	// Form validation state
	const [errors, setErrors] = useState({});

	// Setting button text on form submission
	const [buttonText, setButtonText] = useState('Send');

	// Setting success or failure messages states
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);
	const [showFailureMessage, setShowFailureMessage] = useState(false);

	const handleValidation = () => {
		let tempErrors = {};
		let isValid = true;

		if (fullName.length <= 0) {
			tempErrors['fullname'] = true;
			isValid = false;
		}
		if (email.length <= 0) {
			tempErrors['email'] = true;
			isValid = false;
		}
		if (message.length <= 0) {
			tempErrors['message'] = true;
			isValid = false;
		}

		setErrors({ ...tempErrors });
		console.log('errors', errors);
		return isValid;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		let isValidForm = handleValidation();

		if (isValidForm) {
			setButtonText('Sending');
			const res = await fetch('/api/sendgrid', {
				body: JSON.stringify({
					email: email,
					fullName: fullName,
					message: message,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
			});

			const { error } = await res.json();
			if (error) {
				console.log(error);
				setShowSuccessMessage(false);
				setShowFailureMessage(true);
				setButtonText('Send');
				return;
			}
			setShowSuccessMessage(true);
			setShowFailureMessage(false);
			setButtonText('Message Sent');

			// Reset form fields
			setFullName('');
			setEmail('');
			setMessage('');
		}
		console.log(fullName, email, message);
	};

	return (
		<>
			<Seo
				title="Contact us"
				description="Get in touch with the Downbeat Academy team to provide feedback or just say hello!"
				slug="/contact"
			/>
			<ShowTitleWrapper title="Contact us" />
			<StyledGrid>
				<Form onSubmit={handleSubmit}>
					<Flex direction="column" gap="2">
						<Label htmlFor="fullName">Full name</Label>
						<Input
							type="text"
							name="fullName"
							autoComplete="name"
							value={fullName}
							onChange={(e) => {
								setFullName(e.target.value);
							}}
						/>
					</Flex>
					<Flex direction="column" gap="2">
						<Label htmlFor="email">Email</Label>
						<Input
							type="email"
							name="email"
							autoComplete="email"
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
							}}
						/>
					</Flex>
					<Flex direction="column" gap="2">
						<Label htmlFor="fullName">Message</Label>
						<TextArea
							name="message"
							value={message}
							rows="5"
							onChange={(e) => {
								setMessage(e.target.value);
							}}
						/>
					</Flex>
					<Button type="submit" variant="primary">
						{buttonText}
					</Button>
					{showSuccessMessage === true ? (
						<Paragraph>Message sent successfully.</Paragraph>
					) : null}
					{showFailureMessage === true ? (
						<Paragraph>
							Sorry, there was an issue sending your message.
							Please try again later or contact us{' '}
							<a href="mailto:jory@downbeatacademy.com">here.</a>
						</Paragraph>
					) : null}
				</Form>
			</StyledGrid>
		</>
	);
}

const StyledGrid = styled('section', {
	display: 'grid',
	gridTemplateColumns: '1fr minmax(300px, 75ch) 1fr',
	gap: '$5',
	width: '100%',

	[`${Form}`]: {
		gridColumn: '2',
		width: '100%',
		padding: '0 $5',
	},
});
