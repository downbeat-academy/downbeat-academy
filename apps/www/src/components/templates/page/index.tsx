import { ModuleRenderer } from '@components/content-modules'
import { PageTitle } from "@components/page-title"
import { Seo } from '@components/meta'
import { PageTemplateProps } from "./types"

const PageTemplate = ({
  title,
  subtitle,
  moduleContent
}: PageTemplateProps) => {
  return (
    <>
      <Seo title='Page' />
      <PageTitle title={title} subtitle={subtitle} alignment='left' />
      <ModuleRenderer modules={moduleContent} />
    </>
  )
}

export { PageTemplate }