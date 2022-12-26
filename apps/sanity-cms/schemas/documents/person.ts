import { BiUserCircle } from 'react-icons/bi'

export default {
	name: `person`,
	type: `document`,
	title: `Person`,
	icon: BiUserCircle,
	fields: [
		{
			title: `Name`,
			name: `name`,
			type: `string`,
			description: `First and last name of the person. Example: John Coltrane.`,
			validation: (Rule) => [
				Rule.required().error(
					`Name is a required field, please enter the person's name.`
				),
				Rule.min(2)
					.max(96)
					.warning(
						'The recommended length for a new person is between 2 and 96 characters.'
					),
			],
		},
		{
			name: `slug`,
			title: `Slug`,
			type: `slug`,
			description: `Slug or URL, generate from the name.`,
			validation: (Rule) => [
				Rule.required().error(
					`The person needs a slug for a page to be created for them correctly. You can generate one based off the person's name.`
				),
			],
			options: {
				source: `name`,
			},
		},
		{
			name: `socialLinks`,
			title: `Social Links`,
			type: `array`,
			description: `Link the persons social media accounts.`,
			of: [{ type: `socialLink` }],
		},
		{
			name: `image`,
			title: `Image`,
			type: `mainImage`,
			description: `Link an existing image asset for the person. If the asset doesn't already exist create a new asset type.`,
			validation: (Rule) => [
				Rule.required().error(
					`You must provide an image for the person, otherwise upload a placeholder.`
				),
			],
		},
		{
			name: `avatar`,
			title: `Avatar`,
			type: `mainImage`,
			description: `Square cropped image for use as an avatar.`,
			validation: (Rule) => [
				Rule.required().error(
					`You must provide an image for the person, otherwise upload a placeholder.`
				),
			],
		},
		{
			name: `instrument`,
			title: `Instrument(s) & Proficiencies`,
			type: `array`,
			description: `Instruments or proficiencies that a person performs or excels at.`,
			of: [{ type: `string` }],
		},
		{
			title: `Biography`,
			name: `biography`,
			type: `richText`,
			description: `Biography or information about the person.`,
			validation: (Rule) => [
				Rule.required().warning(
					`It's recommended to add a biography for the person but not required.`
				),
			],
		},
	],
	preview: {
		select: {
			title: `name`,
			media: `avatar.image`,
		},
	},
}
