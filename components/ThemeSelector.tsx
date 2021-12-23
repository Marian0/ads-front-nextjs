import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { IconButton, useColorMode } from "@chakra-ui/react";
import React from "react";

export default function ThemeSelector() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="change"
      icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      variant="ghost"
      onClick={toggleColorMode}
    />
  );
}
