import React, { FC } from "react";
import { Badge } from '../badge'
import type { BadgeProps } from '../types'

const Example: FC<BadgeProps> = ({
  text = "Badge",
  type = 'neutral',
  size = 'medium',
  style = 'filled',
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Badge
        text={text}
        type={type}
        size={size}
        style={style}
      />
    </div>
  );
};

export default Example;