interface AvatarGroupProps {
    avatars: React.ReactNode,
    overlap?: boolean,
    overlapSpacing?: 'compact' | 'default' | 'comfortable',
    direction?: 'horizontal' | 'vertical',
    isInteractive?: boolean,
}

export type { AvatarGroupProps }