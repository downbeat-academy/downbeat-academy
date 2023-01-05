import { getLandingPage, getAllLandingPageSlugs } from "./queries";

export const dynamicParams = true

export async function generateStaticParams() {
  return await getAllLandingPageSlugs()
}

export default async function LandingPage({ params }) {
  const data = await getLandingPage({ slug: params.slug })

  const {
    title
  } = data || {}

  return (<h1>{title}</h1>)
}