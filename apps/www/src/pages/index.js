import { GET_HOMEPAGE_DATA } from '@lib/queries';
import { getClient } from '@lib/sanity.server';
import { Seo } from '@components/meta';
import { FeaturedContent } from '@components/home';
import { BlogGrid, PostCard } from '@components/articles';

export default function Home({ data }) {
	const content = data.content.slice(1);
	const featured = data.content[0];

	return (
		<>
			<Seo
				title="Resources for advancing musicians, students and educators"
				description="Recent posts, courses, and educational content fueling the learning of musicians, students and educators to accelerate their music experience."
			/>
			<FeaturedContent featuredObj={featured} />
			<BlogGrid
				css={{
					maxWidth: '100%',
				}}
			>
				{content.map((item) => {
					return <PostCard postObj={item} key={item._id} />;
				})}
			</BlogGrid>
		</>
	);
}

export async function getStaticProps() {
	const content = await getClient().fetch(GET_HOMEPAGE_DATA);

	return {
		props: {
			data: { content },
		},
		revalidate: 10,
	};
}
