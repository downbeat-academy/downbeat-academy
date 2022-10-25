import { BiLinkAlt } from 'react-icons/bi';

export default {
	name: `socialLink`,
	title: `Social Links`,
	type: `object`,
	icon: BiLinkAlt,
	fields: [
		{
			name: `platform`,
			title: `Platform`,
			type: `string`,
			description: `Select the social platform you would like to link.`,
			options: {
				list: [
					{ title: `Facebook`, value: `facebook` },
					{ title: `Instagram`, value: `instagram` },
					{ title: `Twitter`, value: `twitter` },
					{ title: `LinkedIn`, value: `linkedin` },
					{ title: `TikTok`, value: `tiktok` },
					{ title: `Website`, value: `website` },
					{ title: `YouTube`, value: `youtube` },
				],
				layout: `dropdown`,
			},
			validation: (Rule) => [
				Rule.required().error(`You must select a platform.`),
			],
		},
		{
			name: `url`,
			title: `URL`,
			type: `url`,
			description: `Paste the URL from the your social platform page or account.`,
			validation: (Rule) => [
				Rule.required().error(`You must paste a URL.`),
			],
		},
	],
	preview: {
		select: {
			title: `platform`,
			subtitle: `url`,
		},
	},
};
