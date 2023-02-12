import { Seo } from "@components/meta"
import { ContentGrid } from "@components/layout"
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
  return (
    <>
      <Seo
        title={title}
      />
      <main className={s.articleWrapper}>
        <ArticleTitle
          title={title}
          excerpt={excerpt}
          categories={categories}
          authors={authors}
          date={date}
          updateDate={updatedDate}
        />
      </main>
    </>
  )
}

export { ArticleTemplate }