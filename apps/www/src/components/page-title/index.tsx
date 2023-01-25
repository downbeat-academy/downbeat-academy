import { Text } from 'cadence-core'
import classnames from 'classnames'
import { PageTitleProps } from './types'
import s from './pageTitle.module.scss'

const PageTitle = ({
  title,
  subtitle,
  alignment
}: PageTitleProps) => {

  const classes = classnames(
    s.wrapper,
    s[`alignment--${alignment}`]
  )

  return (
    <section className={classes}>
      <Text
        tag='h1'
        type='expressive'
        category='headline'
        color='primary'
        size='6x-large'
        collapse
        className={s.title}
      >{title}</Text>
      <Text
        tag='p'
        type='expressive'
        category='body'
        color='primary'
        size='x-large'
        collapse
        className={s.subtitle}
      >{subtitle}</Text>
    </section>
  )
}

export { PageTitle } 