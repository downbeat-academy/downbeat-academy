interface FlexProps {
    as?: React.ElementType,
    children: React.ReactNode,
    direction?: 'row' | 'column',
    gap?: 'x-small' | 'small' | 'medium' | 'large' | 'x-large',
    padding?: 'x-small' | 'small' | 'medium' | 'large' | 'x-large',
    background?: 'primary' | 'secondary' | 'brand' | 'interactive' | 'positive' | 'caution' | 'critical' | 'info',
    borderRadius?: 'default' | 'soft' | 'medium' | 'hard' | 'rounded',
    borderColor?: 'default' | 'caution' | 'critical' | 'positive' | 'info' | 'interactive',
    justify?: 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly',
    align?: 'start' | 'end' | 'center' | 'stretch' | 'baseline',
    textAlign?: 'left' | 'right' | 'center',
    wrap?: 'nowrap' | 'wrap' | 'wrap-reverse',
}

export type { FlexProps }