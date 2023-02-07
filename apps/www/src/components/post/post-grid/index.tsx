import s from './postGrid.module.scss'

const PostGrid = ({ children }) => {
	return <section className={s.wrapper}>{children}</section>
}

export { PostGrid }
