import { extendTheme, theme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const themeSettings = {
  styles: {
    global: (props: any) => ({
      "html, body, #root, #__next": {
        color: mode(undefined, "whiteAlpha.900")(props),
        height: "100%",
      },
      "*::-webkit-scrollbar": {
        display: "none",
      },
    }),
  },
  colors: {
    primary: theme.colors.whatsapp,
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac",
    },
  },
};

export default extendTheme(themeSettings);
