import { author } from "../../../../types/author"
import { category } from "../../../../types/category"

interface ArticleTitleProps {
  title: string,
  excerpt: string,
  categories: category[],
  authors: author[],
  date: string,
  updatedDate?: string,
}

export type { ArticleTitleProps }