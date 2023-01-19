import { sanityClient } from '@lib/sanity.client';
import { getContributors, getContributorPaths } from '@lib/sanity.queries';

export default function Contributor({ data, preview }) {
  const { name, instrument } = data.contributor

  return (
    <h1>{name}</h1>
  )
}

export const getStaticProps = async ({ params, preview = false }) => {
  const contributor = await sanityClient.fetch(getContributors, {
    slug: params.slug
  })

  return {
    props: {
      preview,
      data: { contributor }
    },
    revalidate: 60,
  }
}

export const getStaticPaths = async ({ parms, preview = false }) => {
  const paths = await sanityClient.fetch(getContributorPaths)

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}
