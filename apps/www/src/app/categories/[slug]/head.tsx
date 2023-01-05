import DefaultHead from "@app/defaultHead";
import { getCategory } from "./queries";

export default async function Head({ params }) {

  const category = await getCategory({ slug: params.slug })

  const {
    title
  } = category || {}

  return (
    <>
      <DefaultHead />
      <title>{`${title} | Downbeat Academy`}</title>
    </>
  )
}