import React from 'react'
import styles from '../../styles/components/button/Button.module.scss'

interface ButtonProps {
    children: React.ReactNode,
}

export const Button = ({ children }: ButtonProps) => {
    return (
        <button className={styles.button}>{children}</button>
    )
}