import { Seo } from "@components/meta"
import { ContentGrid } from "@components/layout"
import { ModuleRenderer } from '@components/content-modules'
import { RichText } from "@components/content-modules"
import { ArticleTemplateProps } from "./types"
import { ArticleTitle } from './article-title'
import s from './articleTemplate.module.scss'

const ArticleTemplate = ({
  title,
  excerpt,
  content,
  date,
  updatedDate,
  authors,
  categories,
  featuredImage,
  metadata,
}: ArticleTemplateProps) => {

  console.log(content)
  return (
    <>
      <Seo
        title={title}
      />
      <ContentGrid location="full-bleed">
        <ArticleTitle
          title={title}
          excerpt={excerpt}
          categories={categories}
          authors={authors}
          date={date}
          updateDate={updatedDate}
        />
        <RichText value={content.content} />
      </ContentGrid>
    </>
  )
}

export { ArticleTemplate }