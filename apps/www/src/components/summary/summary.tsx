import classnames from 'classnames'
import { Flex, Text } from 'cadence-core'
import { ChevronRight } from 'cadence-icons'
import s from './summary.module.css'
import type { SummaryProps } from './types'

const Summary = ({
  title = {
    text: 'Summary',
    type: 'productive-body',
    size: 'body-large',
    color: 'primary',
  },
  isOpen = false,
  type = 'contained',
  size = 'medium',
  maxWidth,
  children,
  className,
}: SummaryProps) => {

  const rootClasses = classnames(
    s['root'],
    s[`type--${type}`],
    className
  )
  const titleClasses = classnames(
    s['title'],
    s[`size--${size}`],
    { [s['is-open']]: isOpen, },
  )

  const contentClasses = classnames(
    s['content'],
    s[`size--${size}`],
  )

  return (
    <details className={rootClasses} style={{ maxWidth: maxWidth }} open={isOpen}>
      <Text
        tag='summary'
        type={title.type}
        size={title.size}
        color={title.color}
        collapse={true}
        className={titleClasses}
      >
        <ChevronRight aria-hidden='true' width={16} className={s['icon']} />
        <strong>{title.text}</strong>
      </Text>
      <Flex
        tag='div'
        gap='medium'
        direction='column'
        className={contentClasses}
      >
        {children}
      </Flex>
    </details>
  )
}

export { Summary }