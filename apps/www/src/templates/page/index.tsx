import { PageTitle } from "@components/page-title"
import { Seo } from '@components/meta'

const PageTemplate = ({
  children,
  title
}) => {
  return (
    <>
      <Seo title='Page' />
      <PageTitle title={title} subtitle='This is the subtitle' alignment='center' />
      {children}
    </>
  )
}

export { PageTemplate }