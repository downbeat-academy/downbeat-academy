interface LinkResolverProps {
  url: string,
  category: string,
}

export const linkResolver = ({ url, category }: LinkResolverProps) => {
  switch (category) {
    case 'page': return `${url}`;
    case 'article': return `articles/${url}`;
    case 'category': return `categories/${url}`;
    case 'contributor': return `contributors/${url}`;
    case 'podcast': return `podcasts/${url}`;
    case 'resource': return `resources/${url}`;
    default: return `${url}`;
  }
}