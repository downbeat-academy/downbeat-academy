import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import type { SkeletonLoaderProps } from './types'

const SkeletonLoader = ({
  count = 1,
  circle,
  className,
  width = '100%',
  height,
  borderRadius = 'var(--cds-radii-medium)',
  inline,
  duration,
  direction = 'ltr',
  enableAnimation = true,
}: SkeletonLoaderProps) => {
  return (
    <SkeletonTheme
      baseColor="var(--cds-color-palette-blueberry-200)"
      highlightColor="var(--cds-color-palette-blueberry-100)"
      width={width}
      height={height}
      borderRadius={borderRadius}
      inline={inline}
      duration={duration}
      direction={direction}
      enableAnimation={enableAnimation}
    >
      <Skeleton
        count={count}
        circle={circle}
        className={className}
      />
    </SkeletonTheme>
  )
};

export { SkeletonLoader };