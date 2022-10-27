import React from 'react';
import {
	styled,
	Flex,
	Input,
	HelperText,
	Label,
	TextArea,
	Form,
	Button,
} from 'cadence-design-system';

export const FormRender = ({ input }) => {
	const { method, submitText, title, fields } = input;

	return (
		<FormWrapper>
			<Form method={method} name={title}>
				{fields.map((field) => {
					switch (field._type) {
						case 'input':
							return (
								<Flex
									direction="column"
									gap="2"
									key={field._key}
								>
									{field.label && (
										<Label>{field.label}</Label>
									)}
									<Input
										name={field.name}
										placeholder={field.placeholder}
										type={field.type}
									/>
									{field.helperText && (
										<HelperText>
											{field.helperText}
										</HelperText>
									)}
								</Flex>
							);
						case 'textarea':
							return (
								<Flex
									direction="column"
									gap="2"
									key={field._key}
								>
									{field.label && (
										<Label>{field.label}</Label>
									)}
									<TextArea
										name={field.name}
										placeholder={field.placeholder}
									/>
									{field.helperText && (
										<HelperText>
											{field.helperText}
										</HelperText>
									)}
								</Flex>
							);
					}
				})}
				<Flex>
					<Button variant="primary" size="large">
						{submitText}
					</Button>
				</Flex>
			</Form>
		</FormWrapper>
	);
};

const FormWrapper = styled(Flex, {
	gridColumn: '2',
	padding: '$8 $5',
});
