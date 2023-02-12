import { author } from "../../../types/author"
import { category } from "../../../types/category"

interface ArticleTemplateProps {
  title: string,
  excerpt: string,
  content: any,
  date: string,
  updatedDate?: string,
  authors: author[],
  categories: category[],
  featuredImage?: any,
  metadata?: any,
}

export type { ArticleTemplateProps }