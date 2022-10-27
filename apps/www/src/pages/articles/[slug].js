import Error from 'next/error';
import { useRouter } from 'next/router';
import { usePreviewSubscription } from '@lib/sanity';
import { getClient } from '@lib/sanity.server';
import { GET_ALL_ARTICLES, GET_ARTICLE_PATHS } from '@lib/queries';
import { Seo } from '@components/meta';
import { RichText } from '@components/content';
import { PostTitle } from '@components/articles';
import { GridInner } from '@components/layout';

export default function Article({ data, preview }) {
	const router = useRouter();

	const { data: article } = usePreviewSubscription(GET_ALL_ARTICLES, {
		params: { slug: data.article?.slug },
		initialData: data.article,
		enabled: preview && data.article?.slug,
	});

	if (!router.isFallback && !data.article?.slug) {
		return <Error statusCode={404} />;
	}

	const {
		title,
		content,
		excerpt,
		date,
		_updatedAt,
		authors,
		categories,
		featuredImage,
		metadata,
	} = article;

	return (
		<>
			<Seo title={title} description={excerpt} />
			<PostTitle
				title={title}
				excerpt={excerpt}
				categories={categories}
				authors={authors}
				date={date}
				lastUpdated={_updatedAt}
			/>
			<GridInner>
				<RichText value={content.content} />
			</GridInner>
		</>
	);
}

export async function getStaticProps({ params, preview = false }) {
	const article = await getClient().fetch(GET_ALL_ARTICLES, {
		slug: params.slug,
	});

	return {
		props: {
			preview,
			data: { article },
		},
		revalidate: 10,
	};
}

export async function getStaticPaths() {
	const paths = await getClient().fetch(GET_ARTICLE_PATHS);

	return {
		paths: paths.map((slug) => ({ params: { slug } })),
		fallback: false,
	};
}
