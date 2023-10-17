import classnames from 'classnames'
import { Flex } from '@components/flex'
import { Text } from '@components/text'
import { Link } from '@components/link'
import s from './blockquote.module.scss'

import type { BlockquoteProps } from './types'

const Blockquote = ({
  quote,
  attribution,
  link,
  collapse,
  className,
}: BlockquoteProps) => {

  const classes = classnames([
    s.root,
    { [s.collapse]: collapse },
    className,
  ])

  const renderAttribution = () => {
    if (link !== undefined) {
      return (
        <Text tag='p' type='expressive-body' size='body-small' collapse>
          <Link href={link} color='secondary'>– {attribution}</Link>
        </Text>
      )
    } else {
      return (
        <Text tag='p' type='expressive-body' size='body-small' collapse>
          – {attribution}
        </Text>
      )
    }
  }

  return (
    <Flex
      tag='div'
      direction='column'
      gap='large'
      className={classes}
    >
      {quote &&
        <Text tag='blockquote' type='expressive-body' size='body-large' collapse>
          <em>{quote}</em>
        </Text>
      }
      {renderAttribution()}
    </Flex>
  )
}

export { Blockquote }
export type { BlockquoteProps }