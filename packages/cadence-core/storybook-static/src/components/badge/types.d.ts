import { ReactElement } from '../../../../../node_modules/.pnpm/react@18.2.0/node_modules/react';
interface BadgeProps {
    type?: 'neutral' | 'info' | 'success' | 'highlight' | 'warning' | 'error';
    size?: 'small' | 'medium' | 'large';
    style?: 'filled' | 'outlined' | 'light';
    text?: string;
    icon?: ReactElement;
    className?: string;
}
export type { BadgeProps };
