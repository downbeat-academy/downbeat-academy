import classnames from 'classnames'
import { FlexProps } from './types'
import s from './flex.module.css'

const Flex = ({
    children,
    as,
    direction = 'row',
    gap,
    padding,
    background,
    borderRadius,
    justify,
    wrap = 'nowrap',
    align,
    textAlign,
}: FlexProps) => {

    const Component = as || 'div';

    const classes = classnames(
        s.root,
        s['direction--' + direction],
        s['gap--' + gap],
        s['padding--' + padding],
        s['background--' + background],
        s['border-radius--' + borderRadius],
        s['justify--' + justify],
        s['wrap--' + wrap],
        s['align--' + align],
        s['text-align--' + textAlign],
    )

    return (
        <Component className={classes}>
            {children}
        </Component>
    )

}

export type { FlexProps }
export { Flex }