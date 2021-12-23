import React from "react";
import { Spinner, Flex, Text, FlexProps } from "@chakra-ui/react";

interface Props extends FlexProps {
  message?: string | undefined;
}

export default function LoadingOverlay({ message, ...props }: Props) {
  return (
    <Flex alignItems="center" height="100vh" justifyContent="center" {...props}>
      {message && <Text>{message}</Text>}
      <Spinner color="red.500" />
    </Flex>
  );
}
