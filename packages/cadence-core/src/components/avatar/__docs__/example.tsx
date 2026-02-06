import React, { FC } from "react";
import { Avatar, AvatarGroup, AvatarProps } from '../index'

const Example: FC<AvatarProps> = ({
  name = "John Doe",
  size = "medium",
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        gap: "2rem",
        height: "100%",
      }}
    >
      <Avatar name={name} size={size} />
      <AvatarGroup spacing="overlap-small">
        <Avatar name="Alice" size={size} />
        <Avatar name="Bob" size={size} />
        <Avatar name="Charlie" size={size} />
      </AvatarGroup>
    </div>
  );
};

export default Example;
