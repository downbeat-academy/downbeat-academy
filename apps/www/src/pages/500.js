import { getClient } from '@lib/sanity.server';
import { SERVER_ERROR } from '@lib/queries';
import { Seo } from '@components/meta';
import { ShowTitleWrapper } from '@components/content';
import { ModuleRenderer } from '@components/content';

export default function Custom500({ data }) {
	const { errorType, title, showTitle, moduleContent, metadata } =
		data.serverErrorPage;

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
	const serverErrorPage = await getClient().fetch(SERVER_ERROR, {
		errorType: '500',
	});

	return {
		props: {
			data: { serverErrorPage },
		},
	};
}
