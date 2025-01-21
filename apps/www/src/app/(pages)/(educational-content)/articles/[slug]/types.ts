type PageProps = {
  params: {
    slug: string;
  }
}

type ArticleData = {
  metadata: {
    title: string;
    description: string;
  };
  title: string;
  excerpt: string;
  featuredImage: {
    image: {
      asset: any; // Replace 'any' with proper Sanity image type
    };
    alternativeText: string;
  };
  authors: any[]; // Replace with proper author type
  date: string;
  categories: Array<{
    title: string;
    slug: string;
  }>;
  content: {
    content: any; // Replace with proper content type
  };
}

export type { PageProps, ArticleData }