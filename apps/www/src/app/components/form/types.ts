// Primitives

interface HelperTextProps {
  children?: React.ReactNode;
  className?: string;
}

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor?: string;
  id?: string;
  children?: React.ReactNode;
  className?: string;
}

interface ValidationMessageProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  type?: 'success' | 'warning' | 'error';
  className?: string;
}

// Form

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  name?: string;
  rel?: string;
  action?: string;
  method?: 'POST' | 'GET';
  spacing?: 'none' | 'small' | 'medium' | 'large';
  maxWidth?: string;
  children?: React.ReactNode;
  className?: string;
}

// Form Field

interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

// Input

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'email' | 'number' | 'tel' | 'url';
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  value?: string;
  id?: string;
  className?: string,
}

// Textarea

interface TextareaProps {
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  value?: string;
  id?: string;
  rows?: number;
  className?: string;
}

export type {
  FormProps,
  FormFieldProps,
  InputProps,
  HelperTextProps,
  LabelProps,
  TextareaProps,
  ValidationMessageProps,
}