import { ModuleRenderer } from '@components/content-modules'
import { PageTitle } from "@components/page-title"
import { Seo } from '@components/meta'
import { PageTemplateProps } from "./types"
import { ContentWrapper, InnerWrapper } from '@components/layout'

const PageTemplate = ({
  title,
  subtitle,
  moduleContent
}: PageTemplateProps) => {
  return (
    <>
      <Seo title='Page' />
      <ContentWrapper>
        <InnerWrapper location='content'>
          <PageTitle title={title} subtitle={subtitle} alignment='left' />
          <ModuleRenderer modules={moduleContent} />
        </InnerWrapper>
      </ContentWrapper>
    </>
  )
}

export { PageTemplate }