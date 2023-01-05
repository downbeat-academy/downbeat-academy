import { getPodcast, getAllPodcastSlugs } from "./queries";

export const dynamicParams = true

export async function generateStaticParams() {
  return await getAllPodcastSlugs()
}

export default async function Podcast({ params }) {
  const data = await getPodcast({ slug: params.slug })

  const {
    title
  } = data || {}

  return (<h1>{title}</h1>)
}