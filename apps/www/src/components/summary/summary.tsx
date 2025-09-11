import { Flex } from 'cadence-core'
import s from './summary.module.css'
import type { SummaryProps } from './types'

const Summary = ({
  title,
  description,
}: SummaryProps) => {
  return (
    <details>
      <summary className={s.title}>{title}</summary>
      <Flex className={s.description}>
        {description}
      </Flex>
    </details>
  )
}

export { Summary }