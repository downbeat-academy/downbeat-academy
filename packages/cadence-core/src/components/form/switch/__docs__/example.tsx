import React, { FC } from "react";
import { Switch, SwitchProps } from '../switch'
import { FormField } from "../../form-field/form-field";
import { Label } from "../../primitives/label";

const Example: FC<SwitchProps> = ({ id }) => {
  return (
    <FormField orientation='horizontal'>
      <Switch
        id={id}
      />
      <Label htmlFor={id}>Switch</Label>
    </FormField>
  );
};

export default Example;