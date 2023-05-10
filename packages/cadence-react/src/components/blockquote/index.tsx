import { Text } from '../text'
import { BlockquoteProps } from './types'
import s from './blockquote.module.scss'

const Blockquote = ({
  children,
  attribution,
  source
}: BlockquoteProps) => {
  return (
    <blockquote className={s.root}>
      "{children}"
      <div className={s.attribution}>
        <Text tag='p' size='small' type='expressive' category='body' color='primary' collapse className='attribution-text'><em>{attribution}</em></Text>
        <Text tag='p' size='x-small' type='expressive' category='body' collapse className={s.sourceText}><a href={source}>{source}</a></Text>
      </div>
    </blockquote>
  )
}

export { Blockquote }