'use client'

import * as React from "react"
import classnames from 'classnames'
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import s from './separator.module.scss'

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  ({
    className,
    orientation = "horizontal",
    decorative = true,
    color = 'primary',
    ...props
  },
    ref
  ) => {
    const classes = classnames([
      s.root,
      s[`color--${color}`],
      s[`orientation--${orientation}`]
    ])

    return (
      <SeparatorPrimitive.Root
        ref={ref}
        decorative={decorative}
        orientation={orientation}
        className={classes}
        {...props}
      />
    )
  }
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
