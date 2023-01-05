import { getResource, getAllResourceSlugs } from "./queries";

export const dynamicParams = true

export async function generateStaticParams() {
  return await getAllResourceSlugs()
}

export default async function Resource({ params }) {
  const data = await getResource({ slug: params.slug })

  const {
    title
  } = data || {}

  return (<h1>{title}</h1>)
}