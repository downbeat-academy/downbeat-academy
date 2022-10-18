import React from 'react'

interface ButtonProps {
    children: React.ReactNode,
}

export const Button = ({ children }: ButtonProps) => {
    return (
        <button>{children}</button>
    )
}