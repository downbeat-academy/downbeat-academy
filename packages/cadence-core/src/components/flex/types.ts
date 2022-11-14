interface FlexProps {
    as?: React.ElementType,
    children: React.ReactNode,
    direction?: 'row' | 'column',
    gap?: 'x-small' | 'small' | 'medium' | 'large' | 'x-large',
    padding?: 'x-small' | 'small' | 'medium' | 'large' | 'x-large',
    background?: 'primary' | 'secondary' | 'brand' | 'interactive' | 'positive' | 'caution' | 'critical' | 'info',
    borderRadius?: 'none' | 'small' | 'medium' | 'large',
    borderColor?: 'default' | 'caution' | 'critical' | 'positive' | 'info' | 'interactive',
    justify?: 'start' | 'end' | 'cneter' | 'space-between' | 'space-around' | 'space-evenly',
    align?: 'start' | 'end' | 'cneter' | 'stretch' | 'baseline',
    wrap?: 'nowrap' | 'wrap' | 'wrap-reverse',
}

export type { FlexProps }