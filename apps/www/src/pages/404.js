import { getClient } from '@lib/sanity.server';
import { NOT_FOUND } from '@lib/queries';
import { Seo } from '@components/meta';
import { ShowTitleWrapper } from '@components/content';
import { ModuleRenderer } from '@components/content';

export default function Custom404({ data }) {
	const { errorType, title, showTitle, moduleContent, metadata } =
		data.notFoundPage;

	return (
		<>
			<Seo
				title={metadata.title}
				description={metadata.description}
				slug="/404"
			/>
			{showTitle && <ShowTitleWrapper title={title} />}
			{moduleContent && <ModuleRenderer modules={moduleContent} />}
		</>
	);
}

export async function getStaticProps({ params }) {
	const notFoundPage = await getClient().fetch(NOT_FOUND, {
		errorType: '404',
	});

	return {
		props: {
			data: { notFoundPage },
		},
	};
}
