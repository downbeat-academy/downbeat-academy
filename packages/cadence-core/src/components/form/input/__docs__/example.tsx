import React, { FC } from "react";
import { Input, InputProps } from '../input'

const Example: FC<InputProps> = ({
  type = 'text',
  name,
  placeholder = 'Placeholder text',
  disabled = false,
  readOnly,
  value,
  id,
  className,
  isInvalid,
}) => {
  return (
    <Input
      type={type}
      name={name}
      disabled={disabled}
      placeholder={placeholder}
      readOnly={readOnly}
      value={value}
      id={id}
      className={className}
      isInvalid={isInvalid}
    />
  );
};

export default Example;