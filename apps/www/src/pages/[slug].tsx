import { sanityClient } from '@lib/sanity.client';
import { getPages, getPagePaths } from '@lib/sanity.queries';
import { Seo } from '@components/meta';

export default function Page({ data, preview }) {


  const { title, moduleContent, showTitle, slug, metadata } = data.page;

  return (
    <>
      <h1>{title}</h1>
      {/* <Seo
				title={title}
				description={metadata.description}
				slug={slug}
				image={
					metadata.ogImage &&
					getSanityUrl(metadata.ogImage.asset._ref)
				}
			/>
			{showTitle && <ShowTitleWrapper title={title} />}
			{moduleContent && <ModuleRenderer modules={moduleContent} />} */}
    </>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const page = await sanityClient.fetch(getPages, {
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
  const paths = await sanityClient.fetch(getPagePaths)

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}
