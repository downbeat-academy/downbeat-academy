import { ModuleRenderer } from '@components/content-modules'
import { PageTitle } from "@components/page-title"
import { Seo } from '@components/meta'
import { PageTemplateProps } from "./types"
import { ContentWrapper, ContentGrid, ContentGridItem } from '@components/layout'

const PageTemplate = ({
  title,
  subtitle,
  moduleContent
}: PageTemplateProps) => {

  return (
    <>
      <Seo title={title} />
      <ContentGrid>
        <ContentGridItem location='center'>
          <PageTitle title={title} subtitle={subtitle} alignment='left' />
          <ModuleRenderer modules={moduleContent} />
        </ContentGridItem>
      </ContentGrid>
    </>
  )
}

export { PageTemplate }