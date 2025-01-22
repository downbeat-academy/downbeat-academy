import React, { FC } from "react";
import { FormField, FormFieldProps } from '../form-field'
import { Input, Label } from '../../index'

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