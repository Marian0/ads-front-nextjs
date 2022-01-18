import React from "react";
import Link from "next/link";
import { Text, Box, Heading, Badge, useColorMode } from "@chakra-ui/react";

import { Ad } from "../../types/ad";

export default function AdSimple({ ad }: { ad: Ad }) {
  const { colorMode } = useColorMode();

  return (
    <Link passHref href={`/ad/${ad.slug}`}>
      <Box
        _hover={{
          backgroundColor: colorMode === "light" ? "gray.100" : "gray.700",
        }}
        border="2px"
        borderColor="gray.200"
        borderRadius={5}
        cursor="pointer"
        padding={10}
      >
        <Heading fontSize={20}>{ad.title}</Heading>
        <Text>{ad.description}</Text>
        <Badge>{ad.status}</Badge>
      </Box>
    </Link>
  );
}
