import classnames from 'classnames'
import { TextProps } from './types'
import s from './text.module.css'

const Text = ({
	children,
	tag,
	type = 'productive',
	size = 'base',
	color = 'primary',
	fluid = false,
}: TextProps) => {
	const getLineHeight = (tag: string) => {
		switch (tag) {
			case 'h1' || 'h2' || 'h3' || 'h4' || 'h5' || 'h6':
				return 'headline'
			case 'p' || 'span' || 'code' || 'pre' || 'sup' || 'sub':
				return 'body'
		}
	}

	const classes = classnames(
		s.root,
		s['type--' + type],
		s[size],
		s['color--' + color],
		[fluid ? s.fluid : null],
		s['line-height--' + getLineHeight(tag)]
	)

	switch (tag) {
		case 'h1':
			return <h1 className={classes}>{children}</h1>
		case 'h2':
			return <h2 className={classes}>{children}</h2>
		case 'h3':
			return <h3 className={classes}>{children}</h3>
		case 'h4':
			return <h4 className={classes}>{children}</h4>
		case 'h5':
			return <h5 className={classes}>{children}</h5>
		case 'h6':
			return <h6 className={classes}>{children}</h6>
		case 'p':
			return <p className={classes}>{children}</p>
		case 'span':
			return <span className={classes}>{children}</span>
		case 'caption':
			return <caption className={classes}>{children}</caption>
		case 'code':
			return <code className={classes}>{children}</code>
		case 'cite':
			return <cite className={classes}>{children}</cite>
		case 'pre':
			return <pre className={classes}>{children}</pre>
		case 'sup':
			return <sup className={classes}>{children}</sup>
		case 'sub':
			return <sub className={classes}>{children}</sub>
		default:
			return <p className={classes}>{children}</p>
	}
}

export type { TextProps }
export { Text }
