import s from './nav-content.module.scss'

const NavContent = ({ children }) => {
  return (
    <div className={s.root}>
      <div>
        Logo goes here
      </div>
      <nav>
        Links go here
      </nav>
    </div>
  )
}

export { NavContent };