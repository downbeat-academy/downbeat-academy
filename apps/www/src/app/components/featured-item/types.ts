interface FeaturedItemProps {
  children?: React.ReactNode,
}

interface FeaturedItemTitleProps {
  children?: React.ReactNode,
  className?: string,
  background?: string,
}

interface FeaturedItemImageProps {
  image?: any,
  alt?: string,
}

interface FeaturedItemAuthorsProps {}

export type {
  FeaturedItemProps,
  FeaturedItemTitleProps,
  FeaturedItemImageProps,
  FeaturedItemAuthorsProps,
}