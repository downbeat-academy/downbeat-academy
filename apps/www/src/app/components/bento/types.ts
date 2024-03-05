interface BentoBoxProps {
  children: React.ReactNode,
  isFullHeight?: boolean,
  className?: string,
}

interface BentoItemProps {
  background?: 'primary' | 'faint' | 'high-contrast' | 'brand' | 'interactive' | 'success' | 'warning' | 'critical' | 'none';
  children: React.ReactNode;
  className?: string;
  height?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  width?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

export type {
  BentoBoxProps,
  BentoItemProps
}