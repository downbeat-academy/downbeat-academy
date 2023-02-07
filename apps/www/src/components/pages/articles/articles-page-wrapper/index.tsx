import { ArticlesPageWrapperProps } from "./types"
import s from './articlesPageWrapper.module.scss'

const ArticlesPageWrapper = ({ children }: ArticlesPageWrapperProps) => {
  return (
    <section className={s.wrapper}>
      {children}
    </section>
  )
}

export { ArticlesPageWrapper }