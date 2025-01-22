import React, { FC } from "react";
import { LogoLockup } from '../logo-lockup'
import { LogoProps } from '../types'

const Example: FC<LogoProps> = ({
  width = 100,
  color = 'brand',
}) => {
  return (
    <LogoLockup width={width} color={color} />
  )
}

export default Example;