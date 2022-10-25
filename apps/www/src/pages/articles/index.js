import { getClient } from '@lib/sanity.server';
import { GET_ARTICLES } from '@lib/queries';
import { usePreviewSubscription } from '@lib/sanity';
import { Seo } from '@components/meta';
import { BlogGrid, PostCard } from '@components/articles';

export default function Article({ data, preview }) {
	const { data: articles } = usePreviewSubscription(GET_ARTICLES, {
		initialData: data.articles,
		enabled: preview && data.articles?.title,
	});

	return (
		<>
			<Seo
				title="Recent articles"
				description="Recent articles on music, jazz, and education from Downbeat Academy"
			/>
			<BlogGrid>
				{articles.map((article) => {
					return <PostCard postObj={article} key={article._id} />;
				})}
			</BlogGrid>
		</>
	);
}

export async function getStaticProps({ preview = false }) {
	const articles = await getClient().fetch(GET_ARTICLES);

	return {
		props: {
			preview,
			data: { articles },
			revalidate: 10,
		},
	};
}
