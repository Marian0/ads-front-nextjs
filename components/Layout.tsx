import {
  Button,
  Container,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import ThemeSelector from "./ThemeSelector";

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  const backgroundColor = useColorModeValue("orange.100", "gray.800");
  const { pathname } = useRouter();

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
            <Button variant={pathname === "/" ? "outline" : "solid"}>
              Home
            </Button>
          </Link>
          <Link passHref href="/signup">
            <Button variant={pathname === "/signup" ? "outline" : "solid"}>
              Register
            </Button>
          </Link>
          <Link passHref href="/signin">
            <Button variant={pathname === "/signin" ? "outline" : "solid"}>
              Login
            </Button>
          </Link>
          <ThemeSelector />
        </Stack>
        {children}
      </Stack>
    </Container>
  );
}
