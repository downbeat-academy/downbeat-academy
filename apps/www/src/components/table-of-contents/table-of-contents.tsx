import classnames from 'classnames'
import { Text } from '@components/text'
import { Link } from '@components/link'
import { toKebabCase } from '@utils/stringFormat'
import { getTocItems } from './getTocItems'
import s from './table-of-contents.module.scss'

import type { TableOfContentsProps } from './types'

const TableOfContents = ({
  items,
  title = 'Table of Contents'
}: TableOfContentsProps) => {

  const classes = classnames([
    s['table-of-contents']
  ])

  const tocItems = getTocItems(items)

  return (
    <aside className={classes}>
      {title &&
        <Text
          size='body-base'
          tag='h6'
          color='faint'
          type='productive-body'
          collapse={true}
        >
          <strong>{title}</strong>
        </Text>
      }
      <ul>
        {tocItems.map(item => {

          const itemSlug = `#${toKebabCase(item.children[0].text)}`
          console.log(itemSlug)

          return (
            <Text
              type='productive-body'
              tag='li'
              key={item._key}
            ><Link href={itemSlug}>{item.children[0].text}</Link></Text>
          )
        })}
      </ul>
    </aside>
  )
}

export { TableOfContents }