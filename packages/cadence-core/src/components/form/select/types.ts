import { SelectHTMLAttributes } from 'react'

/**
 * Props for the Select component
 */
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  /** Whether the select is in an invalid state */
  isInvalid?: boolean
}
