import { sanityClient } from "@lib/sanity.client";
import { getLandingPages, getLandingPagePaths } from "@lib/sanity.queries";

export default function LandingPage({ data, preview }) {
  const { title } = data.landingPage;

  return (
    <>
      <h1>{title}</h1>
    </>
  )
}

export const getStaticProps = async ({ params, preview = false }) => {
  const landingPage = await sanityClient.fetch(getLandingPages, {
    slug: params.slug,
  })

  return {
    props: {
      preview,
      data: { landingPage },
    },
    revalidate: 60,
  }
}

export const getStaticPaths = async () => {
  const paths = await sanityClient.fetch(getLandingPagePaths)

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}