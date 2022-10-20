import { forwardRef } from 'react'
import { getClasses } from '../../utils/getClasses'
import styles from './Button.module.scss'
import { ButtonProps } from './types'

export const Button = forwardRef(({ 
    children,
    variant = 'primary',
    size = 'default',
}: ButtonProps) => {
    const classes = getClasses([
        styles[variant],
        styles[size],
    ])

    return (
        <button className={classes}>{children}</button>
    )
})