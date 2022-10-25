import Error from 'next/error';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { useNextSanityImage } from 'next-sanity-image';
import { sanityConfig } from '@lib/sanityConfig';
import { styled, H1, Paragraph, Avatar } from 'cadence-design-system';
import { usePreviewSubscription } from '@lib/sanity';
import { getClient } from '@lib/sanity.server';
import { GET_ALL_CONTRIBUTORS, GET_CONTRIBUTOR_PATHS } from '@lib/queries';
import { linkResolver } from '@utils/linkResolver';
import { Seo } from '@components/meta';
import { RichText } from '@components/content';

export default function Contributor({ data, preview }) {
	const router = useRouter();

	const { data: contributor } = usePreviewSubscription(GET_ALL_CONTRIBUTORS, {
		params: { slug: data.contributor?.slug },
		initialData: data.contributor,
		enabled: preview && data.contributor?.slug,
	});

	const { name, avatar, biography, content, instrument } = contributor;

	const contributorImageProps = useNextSanityImage(
		sanityConfig,
		avatar.image,
		{
			blurUpImageQuality: 50,
			blurUpImageWidth: 1200,
			blurUpAmount: 25,
		}
	);

	if (!router.isFallback && !data.contributor?.slug) {
		return <Error statusCode={404} />;
	}

	return (
		<>
			<Seo title={name} />
			<Wrapper>
				<Avatar size="large">
					{avatar && (
						<Image
							{...contributorImageProps}
							layout="responsive"
							alt={contributor.name}
						/>
					)}
				</Avatar>
				{name && <H1>{name}</H1>}
				{instrument && (
					<Paragraph size="base" css={{ marginBottom: '0' }}>
						{instrument.map((instrument) => {
							return `${instrument}` + ` `;
						})}
					</Paragraph>
				)}
				{biography && <RichText value={biography.content} />}
				{content &&
					content.map((item) => {
						return (
							<article key={item._id}>
								<Link
									href={linkResolver('article', item.slug)}
									passHref
								>
									<a>
										<Paragraph css={{ marginBottom: '0' }}>
											{item.title}
										</Paragraph>
									</a>
								</Link>
							</article>
						);
					})}
			</Wrapper>
		</>
	);
}

export async function getStaticProps({ params, preview = false }) {
	const contributor = await getClient().fetch(GET_ALL_CONTRIBUTORS, {
		slug: params.slug,
	});

	return {
		props: {
			preview,
			data: { contributor },
		},
		revalidate: 10,
	};
}

export async function getStaticPaths() {
	const paths = await getClient().fetch(GET_CONTRIBUTOR_PATHS);

	return {
		paths: paths.map((slug) => ({ params: { slug } })),
		fallback: false,
	};
}

const Wrapper = styled('section', {
	padding: '$8 $5',
	maxWidth: '75ch',
	margin: '0 auto',
	display: 'flex',
	flexDirection: 'column',
	gap: '$5',
});
