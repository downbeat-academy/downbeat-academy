import React from 'react'
import { getClasses } from '../../utils/getClasses'
import styles from './Button.module.scss'

interface ButtonProps {
    children: React.ReactNode,
    variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'destructive',
    size?: 'large' | 'default' | 'small' | 'x-small',
}

export const Button = ({ 
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
}