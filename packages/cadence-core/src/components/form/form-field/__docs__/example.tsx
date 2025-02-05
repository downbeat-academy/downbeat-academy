import React, { FC } from "react";
import { FormField } from '../form-field'
import { FormFieldProps } from '../types'
import { Input } from '../../input/input'
import { Label } from '../../primitives/label'

const Example: FC<FormFieldProps> = ({
  orientation = 'vertical',
  className
}) => {
  return (
    <FormField
      orientation={orientation}
      className={className}
    >
      <Label
        htmlFor='first-name'
      >First name</Label>
      <Input
        placeholder='John'
      />
    </FormField>
  );
};

export default Example;