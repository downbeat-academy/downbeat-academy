import * as React from 'react';

export interface IconProps extends React.SVGAttributes<SVGElement> {
    children?: never;
    color?: string;
    css?: any;
    size?: 'extraSmall' | 'small' | 'medium' | 'large',
}