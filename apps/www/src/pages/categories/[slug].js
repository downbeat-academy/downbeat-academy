import Error from 'next/error';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { usePreviewSubscription } from '@lib/sanity';
import { getClient } from '@lib/sanity.server';
import { GET_ALL_CATEGORIES, GET_CATEGORY_PATHS } from '@lib/queries';
import { ModuleRenderer } from '@components/content';
import { Seo } from '@components/meta';

export default function Category({ data, preview }) {
	const router = useRouter();

	const { data: category } = usePreviewSubscription(GET_ALL_CATEGORIES, {
		params: { slug: data.category?.slug },
		initialData: data.category,
		enabled: preview && data.category?.slug,
	});

	if (!router.isFallback && !data.category?.slug) {
		return <Error statusCode={404} />;
	}

	const { title, slug, references } = category;

	return (
		<>
			<p>Category: {title}</p>
			{references.map((reference) => {
				return (
					<Link
						href={`/blog/${reference.slug}`}
						key={reference.title}
					>
						<a>{reference.title}</a>
					</Link>
				);
			})}
		</>
	);
}

export async function getStaticProps({ params, preview = false }) {
	const category = await getClient().fetch(GET_ALL_CATEGORIES, {
		slug: params.slug,
	});

	return {
		props: {
			preview,
			data: { category },
		},
		revalidate: 10,
	};
}

export async function getStaticPaths() {
	const paths = await getClient().fetch(GET_CATEGORY_PATHS);

	return {
		paths: paths.map((slug) => ({ params: { slug } })),
		fallback: false,
	};
}
