import { ModuleRenderer } from '@components/content-modules'
import { PageTitle } from "@components/page-title"
import { Seo } from '@components/meta'
import { PageTemplateProps } from "./types"
import { ContentGrid } from '@components/layout'

const PageTemplate = ({
  title,
  subtitle,
  moduleContent
}: PageTemplateProps) => {

  return (
    <>
      <Seo title={title} />
      <ContentGrid location='center' padding='small'>
        <PageTitle title={title} subtitle={subtitle} alignment='left' />
        <ModuleRenderer modules={moduleContent} />
      </ContentGrid>
    </>
  )
}

export { PageTemplate }