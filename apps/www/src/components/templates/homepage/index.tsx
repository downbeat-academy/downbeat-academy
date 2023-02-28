import { Seo } from "@components/meta"
import { ContentGrid, ContentGridItem } from "@components/layout"
import { FeaturedPost } from "@components/pages/homepage"
import { PostGrid, PostCard } from "@components/post"
import { HomepageTemplateProps } from './types'

const HomepageTemplate = ({ articles, featuredArticle }: HomepageTemplateProps) => {

  const getArticles = articles.slice(1).map((article) => {
    return (
      <PostCard
        image={article.featuredImage}
        title={article.title}
        slug={article.slug}
        authors={article.authors}
        date={article.date}
        key={article._id}
      />
    )
  })

  return (
    <>
      <Seo
        title='Resources for advancing musicians, students, and educators'
        description='Downbeat Academy features music education and resources for the masses, taught by accomplished musicians and educators in the field'
        url='/'
      />
      <ContentGrid>
        <ContentGridItem location='full-bleed' padding='none'>
          <FeaturedPost input={featuredArticle} />
          <PostGrid>{getArticles}</PostGrid>
        </ContentGridItem>
      </ContentGrid>
    </>
  )
}

export { HomepageTemplate }