import DefaultHead from "@app/defaultHead";
import { getPodcast } from "./queries";

export default async function Head({ params }) {
  const podcast = await getPodcast({ slug: params.slug })

  const {
    title
  } = podcast || {}

  return (
    <>
      <DefaultHead />
      <title>{`${title} | Downbeat Academy`}</title>
    </>
  )
}