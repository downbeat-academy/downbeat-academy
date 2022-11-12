interface AvatarGroupProps {
    avatars: React.ReactNode,
    overlap?: boolean,
    overlapSpacing?: 'compact' | 'default' | 'comfortable',
    direction?: 'horizontal' | 'vertical',
}

export type { AvatarGroupProps }