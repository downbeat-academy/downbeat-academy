import s from './wrapper.module.scss'

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className={s.wrapper}>
      <div className={s['inner-wrapper']}>
        {children}
      </div>
    </section>
  )
}

export { Wrapper }