import Link from 'next/link'
import { Flex, Button, Badge, Text } from 'cadence-react'
import s from './secondary.module.scss'

const Secondary = () => {
	return (
		<aside className={s.wrapper}>
			<div className={s.content}>
				<div className={s.banner}>
					<Badge
						text="Downbeat Academy 3.0 🚀"
						type="informational"
						style="fill"
						className={s.bannerBadge}
					/>
					<Text
						category="body"
						type="productive"
						size="small"
						tag="p"
						collapse
						className={s.bannerText}
					>
						Welcome to the new and improved Downbeat Academy 3.0
					</Text>
				</div>
				<div className={s.accountActions}>
					<Button variant="tertiary" size="small" text="Login" />
					<Button variant="primary" size="small" text="Sign up for free" />
				</div>
			</div>
		</aside>
	)
}

export { Secondary }
