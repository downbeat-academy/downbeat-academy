import { Badge } from 'cadence-core'

const Categories = ({ categories }) => {
  const getCategories = categories.slice(0, 2).map(category => {
    return <Badge type='neutral' style='outline' text={category.title} key={category.title} />
  })

  return getCategories
}

export { Categories }