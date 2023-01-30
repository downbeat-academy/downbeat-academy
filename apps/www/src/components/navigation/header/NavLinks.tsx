import Link from 'next/link'
import classnames from 'classnames'
import { Button } from 'cadence-core'
import { NavLinksProps } from './types'
import s from './navLinks.module.scss'

const NavLinks = ({ navToggled }: NavLinksProps) => {
	const classes = classnames(s.wrapper, [
		navToggled === true ? s.navLinksOpen : '',
	])

	return (
		<div className={classes}>
			<div className={s.linkWrapper}>
				<Link href="/articles" className={s.styledLink}>
					Articles
				</Link>
				<Link href="/about" className={s.styledLink}>
					About
				</Link>
				<Link href="/contributors" className={s.styledLink}>
					Contributors
				</Link>
				<Link href="/contact" className={s.styledLink}>
					Contact
				</Link>
			</div>
			<div className={s.accountActions}>
				<Button
					variant="tertiary"
					size="large"
					text="Login"
					isFullWidth={true}
				/>
				<Button
					variant="primary"
					size="large"
					text="Sign up for free"
					isFullWidth={true}
				/>
			</div>
		</div>
	)
}

export { NavLinks }
