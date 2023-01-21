import { sanityClient } from "@lib/sanity.client"
import { getHomepageData } from "@lib/sanity.queries"

import { FeaturedPost } from '@components/pages/homepage'

export default function HomePage({ data, preview }) {

  const featuredArticle = data.homepage[0]
  const articles = data.homepage.slice(1);

  // console.log(articles)

  return (
    <>
      <FeaturedPost input={featuredArticle} />
    </>
  )
}

export async function getStaticProps({ params, preview = false }) {
  if (preview) {
    return {
      props: { preview }
    }
  }

  const homepage = await sanityClient.fetch(getHomepageData);

  return {
    props: {
      preview,
      data: { homepage },
    },
    revalidate: 10,
  };
}