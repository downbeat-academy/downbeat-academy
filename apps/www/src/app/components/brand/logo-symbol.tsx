import classnames from 'classnames'
import s from './logo.module.scss'

import type { LogoProps } from "./types"

const LogoSymbol = ({
  color = 'brand',
  width,
  className,
}: LogoProps) => {

  const classes = classnames([
    s[color],
    className,
  ])

  return (
    <svg width={width} height={width} viewBox="0 0 250 250" xmlns="http://www.w3.org/2000/svg" className={classes}>
      <path d="M176.652 143.385C176.652 143.385 180.226 131.888 191.402 120.543C200.312 111.477 220.8 96.1305 220.8 96.1305C220.8 96.1305 220.8 153.059 220.8 153.008C220.8 206.594 177.659 250 124.4 250C71.1408 250 28 206.544 28 153.008C28 100.132 66.1572 67.5142 98.173 60.0689C150.878 47.812 148.412 122.265 148.412 122.265C142.824 117.96 131.85 114.769 124.652 114.769C103.811 114.769 86.897 131.787 86.897 152.755C86.897 173.724 103.811 190.741 124.652 190.741C145.492 190.741 162.406 173.724 162.406 152.755V0C162.406 0.151945 224.978 15.1945 220.8 57.4858C218.685 78.8594 193.113 96.8902 183.196 114.465C173.481 131.635 176.652 143.385 176.652 143.385Z" />
    </svg>
  )
}
export { LogoSymbol }