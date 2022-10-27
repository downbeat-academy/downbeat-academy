import Link from 'next/link';
import Image from 'next/image';
import { styled, Avatar, Paragraph, Flex } from 'cadence-design-system';
import { GET_CONTRIBUTORS } from '@lib/queries';
import { usePreviewSubscription } from '@lib/sanity';
import { getClient } from '@lib/sanity.server';
import { Seo } from '@components/meta';
import { linkResolver } from '@utils/linkResolver';
import { getSanityImageUrl } from '@utils/getSanityImageUrl';

export default function Contributors({ data, preview }) {
	const { data: contributors } = usePreviewSubscription(GET_CONTRIBUTORS, {
		initialData: data.contributors,
		enabled: preview && data.contributors?.name,
	});

	return (
		<>
			<Seo
				title="Contributors"
				description="Contributors to Downbeat Academy"
			/>
			<ContributorGrid>
				{contributors &&
					contributors.map((contributor) => {
						return (
							<Link
								href={linkResolver('person', contributor.slug)}
								passHref
								key={contributor._id}
							>
								<ContributorCard>
									<Avatar
										size="large"
										name={contributor.name}
									>
										<Image
											src={getSanityImageUrl(
												contributor.avatar.image.asset
											)}
											layout="responsive"
											width={80}
											height={80}
											quality={90}
											alt={contributor.name}
										/>
									</Avatar>
									<Flex direction="column">
										<Paragraph
											size="large"
											context="display"
											css={{ marginBottom: '0' }}
										>
											<strong>{contributor.name}</strong>
										</Paragraph>
										<Paragraph
											size="small"
											context="display"
											css={{ marginBottom: '0' }}
										>
											{contributor.instrument.map(
												(instrument) => {
													return (
														`${instrument}` + ` `
													);
												}
											)}
										</Paragraph>
									</Flex>
								</ContributorCard>
							</Link>
						);
					})}
			</ContributorGrid>
		</>
	);
}

export async function getStaticProps({ preview = false }) {
	const contributors = await getClient().fetch(GET_CONTRIBUTORS);

	return {
		props: {
			preview,
			data: { contributors },
		},
	};
}

const ContributorGrid = styled('div', {
	maxWidth: '1600px',
	margin: '0 auto',
	padding: '$8 $5',
	display: 'grid',
	gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
	gap: '$8',

	'@md': {
		gap: '$8',
	},
});

const ContributorCard = styled('a', {
	display: 'flex',
	flexDirection: 'row',
	textDecoration: 'none',
	gap: '$5',
	alignItems: 'center',

	'& > *': {
		textDecoration: 'none',
	},
});
