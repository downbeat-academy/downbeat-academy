import Error from 'next/error';
import { useRouter } from 'next/router';
import { usePreviewSubscription } from '@lib/sanity';
import { getClient } from '@lib/sanity.server';
import { GET_ALL_PAGES, GET_PAGE_PATHS } from '@lib/queries';
import { getSanityUrl } from '@utils/getSanityUrl';
import { ModuleRenderer } from '@components/content';
import { Seo } from '@components/meta';
import { ShowTitleWrapper } from '@components/content';

export default function Page({ data, preview }) {
	const router = useRouter();

	const { data: page } = usePreviewSubscription(GET_ALL_PAGES, {
		params: { slug: data.page?.slug },
		initialData: data.page,
		enabled: preview && data.page?.slug,
	});

	if (!router.isFallback && !data.page?.slug) {
		return <Error statusCode={404} />;
	}

	const { title, moduleContent, showTitle, slug, metadata } = page;

	return (
		<>
			<Seo
				title={title}
				description={metadata.description}
				slug={slug}
				image={
					metadata.ogImage &&
					getSanityUrl(metadata.ogImage.asset._ref)
				}
			/>
			{showTitle && <ShowTitleWrapper title={title} />}
			{moduleContent && <ModuleRenderer modules={moduleContent} />}
		</>
	);
}

export async function getStaticProps({ params, preview = false }) {
	const page = await getClient().fetch(GET_ALL_PAGES, {
		slug: params.slug,
	});

	return {
		props: {
			preview,
			data: { page },
		},
		revalidate: 10,
	};
}

export async function getStaticPaths() {
	const paths = await getClient().fetch(GET_PAGE_PATHS);

	return {
		paths: paths.map((slug) => ({ params: { slug } })),
		fallback: false,
	};
}
