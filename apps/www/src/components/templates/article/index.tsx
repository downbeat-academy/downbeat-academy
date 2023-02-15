import { Seo } from "@components/meta"
import { ContentGrid, ContentGridItem } from "@components/layout"
import { ModuleRenderer, RichText } from "@components/content-modules"
import { ArticleTemplateProps } from "./types"
import { ArticleTitle } from './article-title'

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

  return (
    <>
      <Seo
        title={title}
      />
      <ContentGrid>
        <ContentGridItem location='full-bleed' padding='none'>
          <ArticleTitle
            title={title}
            excerpt={excerpt}
            categories={categories}
            authors={authors}
            date={date}
            updateDate={updatedDate}
          />
        </ContentGridItem>
        <ContentGridItem location='center'>
          {/* <RichText value={content} /> */}
        </ContentGridItem>
      </ContentGrid>
    </>
  )
}

export { ArticleTemplate }