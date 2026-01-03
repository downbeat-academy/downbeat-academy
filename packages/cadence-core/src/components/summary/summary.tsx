import React from 'react'
import classnames from 'classnames'
import { Flex } from '../flex'
import { Text } from '../text'
import { ChevronRight } from 'cadence-icons'
import s from './summary.module.css'
import type { SummaryProps } from './types'

const typeMap = {
  contained: s.typeContained,
  flush: s.typeFlush,
} as const

const sizeMap = {
  small: s.sizeSmall,
  medium: s.sizeMedium,
  large: s.sizeLarge,
} as const

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
    s.root,
    typeMap[type],
    className
  )
  const titleClasses = classnames(
    s.title,
    sizeMap[size],
  )

  const contentClasses = classnames(
    s.content,
    sizeMap[size],
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
        <ChevronRight aria-hidden='true' width={16} className={s.icon} />
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

Summary.displayName = 'Summary'

export { Summary }