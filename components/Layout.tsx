import {
  Button,
  Container,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import Link from "next/link";

import ThemeSelector from "./ThemeSelector";

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  const backgroundColor = useColorModeValue("orange.100", "gray.800");

  return (
    <Container
      alignSelf="center"
      backgroundColor={backgroundColor}
      borderRadius={20}
      height="100%"
      marginY={50}
      maxWidth="container.lg"
    >
      <Stack direction="row">
        <Stack padding={10}>
          <Text>Logo del Site</Text>
          <Link passHref href="/">
            <Button>Home</Button>
          </Link>
          <Link passHref href="/signup">
            <Button>Register</Button>
          </Link>
          <Link passHref href="/signin">
            <Button>Login</Button>
          </Link>
          <ThemeSelector />
        </Stack>
        {children}
      </Stack>
    </Container>
  );
}
