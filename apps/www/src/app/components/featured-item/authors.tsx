import { Flex } from '@components/flex'
import s from './authors.module.scss'

import type { FeaturedItemAuthorsProps } from './types'

const FeaturedItemAuthors = ({ children }) => {
  return (
    <Flex tag='div' className={s.root}>
      {children}
    </Flex>
  )
}

FeaturedItemAuthors.displayName = 'FeaturedItemAuthors';
const Authors = FeaturedItemAuthors;

export { FeaturedItemAuthors, Authors }
export type { FeaturedItemAuthorsProps }