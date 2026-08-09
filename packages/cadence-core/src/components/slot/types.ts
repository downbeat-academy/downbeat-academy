import type { HTMLAttributes, ReactNode } from 'react'

/** Loose prop bag used while merging slot and child props. */
export type AnyProps = Record<string, any>

export interface SlotProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode
}

export interface SlottableProps {
  children?: ReactNode
}
