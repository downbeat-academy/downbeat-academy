import React, { forwardRef } from 'react'
import classnames from 'classnames'
import { ChevronDown } from 'cadence-icons'
import s from './select.module.css'
import type { SelectProps } from './types'

/**
 * Select component
 * A styled native HTML select element. Use with standard <option> and <optgroup> elements.
 *
 * @example
 * <Select value={value} onChange={handleChange}>
 *   <option value="">Select an option</option>
 *   <option value="1">Option 1</option>
 *   <option value="2">Option 2</option>
 * </Select>
 */
const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  className,
  isInvalid,
  children,
  ...props
}, ref) => {
  const selectClasses = classnames(
    s.root,
    isInvalid && s.isInvalid,
    className
  )

  return (
    <div className={s.wrapper}>
      <select
        ref={ref}
        className={selectClasses}
        aria-invalid={isInvalid}
        {...props}
      >
        {children}
      </select>
      <ChevronDown width={16} height={16} className={s.icon} aria-hidden="true" />
    </div>
  )
})

Select.displayName = 'Select'

export { Select }

export type { SelectProps }
