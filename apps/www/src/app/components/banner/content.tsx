import classnames from 'classnames'
import s from './banner-content.module.scss'

const BannerContent = ({ children }: { children: React.ReactNode }) => {

  const classes = classnames([
    s[`banner-content--wrapper`],
  ])
  return (
    <section className={classes}>
      {children}
    </section>
  )
}

BannerContent.displayName = 'BannerContent'

const Content = BannerContent

export { BannerContent, Content }