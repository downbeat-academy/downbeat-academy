import classnames from 'classnames';
import { BadgeProps } from './types';
import s from './badge.module.css';

const Badge = ({
	type = 'neutral',
	text,
	style = 'fill',
	size = 'default',
}: BadgeProps) => {
	const classes = classnames(s.root, s[type], s[style], s[size]);

	return <span className={classes}>{text}</span>;
};

export type { BadgeProps };
export { Badge };
