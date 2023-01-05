import { getContributor, getAllContributorSlugs } from "./queries";

export const dynamicParams = true

export async function generateStaticParams() {
  return await getAllContributorSlugs()
}

export default async function Contributor({ params }) {
  const data = await getContributor({ slug: params.slug })

  const {
    name
  } = data

  return (<h1>{name}</h1>)
}