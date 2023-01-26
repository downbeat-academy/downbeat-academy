type NativeHRProps = JSX.IntrinsicElements['hr']

type PickedNativeHRProps = Pick<
  NativeHRProps,
  | 'align'
>

interface DividerProps extends PickedNativeHRProps {
  color?: 'primary' | 'secondary' | 'high-contrast' | 'brand' | 'interactive',
  width?: 'small' | 'medium' | 'large' | 'full-width',
  height?: 'small' | 'large',
}

export type { DividerProps }