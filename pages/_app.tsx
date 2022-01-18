import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

import theme from "../theme";
import { AuthUserProvider } from "../contexts/auth-user-context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthUserProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthUserProvider>
  );
}

export default MyApp;
