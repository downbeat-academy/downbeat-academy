import React, { FC } from "react";
import { Badge, BadgeProps } from '../badge'

const Example: FC<BadgeProps> = ({
  text = "Badge",
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Badge
        text={text}
      />
    </div>
  );
};

export default Example;