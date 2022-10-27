import Error from 'next/error';
import { useRouter } from 'next/router';
import { groq } from 'next-sanity';
import { usePreviewSubscription } from '@lib/sanity';
import { getClient } from '@lib/sanity.server';
import { GET_ALL_LANDING_PAGES, GET_LANDING_PAGE_PATHS } from '@lib/queries';

export default function LandingPage({ data, preview }) {
	const router = useRouter();

	const { data: landingPage } = usePreviewSubscription(
		GET_ALL_LANDING_PAGES,
		{
			params: { slug: data.landingPage?.slug },
			initialData: data.landingPage,
			enabled: preview && data.landingPage?.slug,
		}
	);

	if (!router.isFallback && !data.landingPage?.slug) {
		return <Error statusCode={404} />;
	}

	const { title } = landingPage;

	return (
		<article>
			<h2>{title}</h2>
		</article>
	);
}

export async function getStaticProps({ params, preview = false }) {
	const landingPage = await getClient().fetch(GET_ALL_LANDING_PAGES, {
		slug: params.slug,
	});

	return {
		props: {
			preview,
			data: { landingPage },
		},
		revalidate: 10,
	};
}

export async function getStaticPaths() {
	const paths = await getClient().fetch(GET_LANDING_PAGE_PATHS);

	return {
		paths: paths.map((slug) => ({ params: { slug } })),
		fallback: false,
	};
}
