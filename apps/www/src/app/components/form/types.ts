// Primitives

interface HelperTextProps {
  children?: React.ReactNode;
  className?: string;
}

interface LabelProps {
  children?: React.ReactNode;
  className?: string;
}

interface ValidationMessageProps {
  children?: React.ReactNode;
  type?: 'success' | 'warning' | 'error';
  className?: string;
}

// Form

interface FormProps {
  children?: React.ReactNode;
  className?: string;
}

// Form Field

interface FormFieldProps {
  children?: React.ReactNode;
  className?: string;
}

// Input

interface InputProps {
  className?: string,
}

// Textarea

interface TextareaProps {
  children?: React.ReactNode;
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