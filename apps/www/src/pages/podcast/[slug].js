import Error from 'next/error';
import { useRouter } from 'next/router';
import { usePreviewSubscription } from '@lib/sanity';
import { getClient } from '@lib/sanity.server';
import { GET_ALL_PODCASTS, GET_PODCAST_PATHS } from '@lib/queries';

export default function Podcast({ data, preview }) {
	const router = useRouter();

	const { data: podcast } = usePreviewSubscription(GET_ALL_PODCASTS, {
		params: { slug: data.podcast?.slug },
		initialData: data.podcast,
		enabled: preview && data.podcast?.slug,
	});

	if (!router.isFallback && !data.podcast?.slug) {
		return <Error statusCode={404} />;
	}

	const { title } = podcast;

	return (
		<article>
			<h2>{title}</h2>
		</article>
	);
}

export async function getStaticProps({ params, preview = false }) {
	const podcast = await getClient().fetch(GET_ALL_PODCASTS, {
		slug: params.slug,
	});

	return {
		props: {
			preview,
			data: { podcast },
		},
		revalidate: 10,
	};
}

export async function getStaticPaths() {
	const paths = await getClient().fetch(GET_PODCAST_PATHS);

	return {
		paths: paths.map((slug) => ({ params: { slug } })),
		fallback: false,
	};
}
