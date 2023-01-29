import classnames from 'classnames'
import { Text, Flex } from 'cadence-core'
import { getSanityUrl } from '@utils/getSanityUrl'
import s from './musicNotation.module.scss'
import { MusicNotationProps } from './types'
import { RenderSheetMusic } from './RenderSheetMusic'

const MusicNotation = ({ input }: MusicNotationProps) => {
  const { title, description, file } = input
  const fileUrl = getSanityUrl(file.asset._ref)
  
  const classes = classnames(
    s.wrapper,
  )

  return (
    <section className={classes}>
      <Flex direction='column' gap='base'>
        {title && <Text tag='h4' type='expressive' category='headline' size='3x-large'>{title}</Text>}
        {description && <Text tag='p' type='expressive' category='body' size='base'>{description}</Text>}
      </Flex>
      {input.file && <RenderSheetMusic file={fileUrl} />}
    </section>
  )
}

export { MusicNotation }