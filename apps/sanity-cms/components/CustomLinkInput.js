import React from 'react';
import { FormField } from '@sanity/base/components';
import { TextInput, Flex, Text, Box, Card } from '@sanity/ui';
import PatchEvent, { set, unset } from '@sanity/form-builder/PatchEvent';
import { useId } from '@reach/auto-id';

const URL = React.forwardRef((props, ref) => {
	const {
		type,
		value,
		readOnly,
		placeholder,
		markers,
		presence,
		compareValue,
		onFocus,
		onBlur,
		onChange,
	} = props;

	const handleChange = React.useCallback(
		(event) => {
			const inputValue = event.currentTarget.value;
			onChange(
				PatchEvent.from(
					inputValue ? set(inputValue) : unset(inputValue)
				)
			);
		},
		[onChange]
	);

	const inputId = useId();

	console.log(type);

	return (
		<FormField
			description={type.description}
			title={type.title}
			compareValue={compareValue}
			__unstable_markers={markers}
			__unstable_presence={presence}
			inputId={inputId}
		>
			<Flex>
				<Flex
					as={Card}
					align="center"
					paddingX={3}
					border
					borderRight={false}
				>
					<Text size={1} muted>
						{type.options?.prepend}
					</Text>
				</Flex>
				<Box flex={1}>
					<TextInput
						value={value}
						readOnly={readOnly}
						placeholder={placeholder}
						onFocus={onFocus}
						onBlur={onBlur}
						onChange={handleChange}
						id={inputId}
					/>
				</Box>
			</Flex>
		</FormField>
	);
});

export default URL;
