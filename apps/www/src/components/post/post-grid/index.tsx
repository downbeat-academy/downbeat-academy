import s from '@styles/components/post/postGrid.module.scss'

const PostGrid = ({ children }) => {
	return <section className={s.wrapper}>{children}</section>
}

export { PostGrid }
