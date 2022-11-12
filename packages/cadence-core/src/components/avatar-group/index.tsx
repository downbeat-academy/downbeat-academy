import classnames from 'classnames'
import { AvatarGroupProps } from "./types";
import s from './avatar-group.module.css'

const AvatarGroup = ({
    avatars,
    overlap = false,
    overlapSpacing = 'default',
    direction = 'horizontal',
}:AvatarGroupProps) => {

    const classes = classnames(
        s.root,
        {[s.overlap]: overlap},
        s['spacing--' + overlapSpacing],
        s['direction--' + direction],
    )

    return (
        <div className={classes}>
            {avatars}
        </div>
    )
}

export type { AvatarGroupProps }
export { AvatarGroup }