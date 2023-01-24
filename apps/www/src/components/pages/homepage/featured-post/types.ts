import type { author } from '../../../../types/author'
import type { category } from '../../../../types/category'

interface FeaturedPostProps {
  input: {
    _id: string,
    title: string,
    date: string,
    excerpt: string,
    authors: author[],
    categories: category[],
    slug: string,
    featuredImage: any,
  }
}

export type { FeaturedPostProps }