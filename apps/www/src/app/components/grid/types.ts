import { ElementType } from "react";

interface GridProps {
  children?: React.ReactNode,
  columns?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12,
  tag?: ElementType,
  className?: string,
}

export type { GridProps }