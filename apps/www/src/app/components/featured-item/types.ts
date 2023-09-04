interface FeaturedItemProps {
  title?: React.ReactNode,
  image?: React.ReactNode,
  authors?: React.ReactNode,
}

interface FeaturedItemTitleProps {
  title?: string,
  description?: string,
  className?: string,
  background?: string,
}

interface FeaturedItemImageProps {
  image?: any,
  alt?: string,
}

export type {
  FeaturedItemProps,
  FeaturedItemTitleProps,
  FeaturedItemImageProps,
}