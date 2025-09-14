type PageProps = {
  params: Promise<{
    slug: string
  }>
}

type ArticleData = {
  metadata: {
    title: string
    description: string
  }
  title: string
  excerpt: string
  featuredImage: {
    image: {
      asset: any
    }
    alternativeText: string
  }
  authors: any[]
  date: string
  categories: Array<{
    title: string
    slug: string
  }>
  content: {
    content: any
  }
}

export type { PageProps, ArticleData }