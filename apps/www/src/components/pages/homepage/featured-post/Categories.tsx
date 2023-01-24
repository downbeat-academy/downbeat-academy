import Link from 'next/link'
import { Badge } from 'cadence-core'
import { linkResolver } from '@utils/linkResolver'
import s from '@styles/pages/homepage/featured-post/categories.module.scss'

const Categories = ({ categories }) => {
  const getCategories = categories.slice(0, 2).map(category => {
    return <Link href={linkResolver(category.slug, 'category')} key={category.title} className={s.badgeLink}><Badge type='neutral' style='outline' text={category.title} /></Link>
  })

  return getCategories
}

export { Categories }