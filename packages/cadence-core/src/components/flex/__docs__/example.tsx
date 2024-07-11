import React, { FC } from "react";
import { Flex, FlexProps } from '../flex'

const Example: FC<FlexProps> = ({
  children,
  tag = 'div',
  gap = 'none',
  padding = 'none',
  direction = 'column',
  className,
  alignItems,
  alignContent,
  justifyItems,
  justifyContent,
  background,
  wrap,
}) => {
  return (
    <Flex
      tag={tag}
      gap={gap}
      padding={padding}
      direction={direction}
      className={className}
      alignItems={alignItems}
      alignContent={alignContent}
      justifyItems={justifyItems}
      justifyContent={justifyContent}
      background={background}
      wrap={wrap}
    >
      {children}
    </Flex>
  );
}

export default Example