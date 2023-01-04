import { Seo } from '@components/meta'

export default function NotFoundPage() {
  return (
    <>
      <Seo
        title='404: Sorry, couldn&apos;t find that page'
        noindex={true}
      />
      <p>404</p>
    </>
  )
}