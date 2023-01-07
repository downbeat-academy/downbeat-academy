import { sanityClient } from '@lib/sanity.client';
import { getArticles, getArticlePaths } from '@lib/sanity.queries';
import { Seo } from '@components/meta';

export default function Article({ data, preview }) {

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
  } = data.article;

  console.log(data)

  return (
    <>
      <Seo title={title} description={excerpt} />
      <h1>{title}</h1>
      {/* <PostTitle
        title={title}
        excerpt={excerpt}
        categories={categories}
        authors={authors}
        date={date}
        lastUpdated={_updatedAt}
      />
      <GridInner>
        <RichText value={content.content} />
      </GridInner> */}
    </>
  );
}

export async function getStaticProps({ params, preview = false }) {
  if (preview) {
    return {
      props: { preview }
    }
  }

  const article = await sanityClient.fetch(getArticles, {
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
  const paths = await sanityClient.fetch(getArticlePaths);

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}
