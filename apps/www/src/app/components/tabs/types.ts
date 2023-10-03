interface TabsProps {
  children?: React.ReactNode,
  defaultValue?: string,
  value?: string,
  onValueChange?: any,
  orientation?: 'vertical' | 'horizontal',
  dir?: 'ltr' | 'rtl',
  activationMode?: 'automatic' | 'manual'
  className?: string,
}

interface TabListProps {
  children?: React.ReactNode,
  loop?: boolean,
  className?: string,
}

interface TabTriggerProps {
  children?: React.ReactNode,
  value: string,
  disabled?: boolean,
  className?: string,
}

interface TabContentProps {
  children?: React.ReactNode,
  value: string,
  className?: string,
}

export type {
  TabsProps,
  TabListProps,
  TabTriggerProps,
  TabContentProps,
}